import {
  Component,
  OnInit,
  AfterViewInit,
  QueryList,
  ViewChildren,
  ElementRef,
  Renderer2,
  OnDestroy
} from '@angular/core';
import { WindowRef } from '../WindowRef';
import {
  lazyLoadImage,
  option,
  MEMES
} from './util';

@Component({
  selector: 'app-image-list-component',
  templateUrl: './image-list-component.component.html',
  styleUrls: ['./image-list-component.component.scss']
})
export class ImageListComponentComponent implements OnInit, AfterViewInit, OnDestroy {

  observer: IntersectionObserver;
  urls = MEMES;

  @ViewChildren('image')
  images: QueryList<ElementRef>;

  constructor(private winRef: WindowRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(this.observerCallback.bind(this), option);
  }

  ngAfterViewInit() {
    const isAPISupported = 'IntersectionObserver' in this.winRef.nativeWindow;
    this.images.forEach((imageRef) => {
      const { nativeElement: image } = imageRef;
      if (!isAPISupported) {
        lazyLoadImage(image);
      } else {
        this.observer.observe(image);
      }
    });
  }

  ngOnDestroy(): void {
    // remove all the observers of images
    this.observer.disconnect();
  }

  observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry) => {
      const img = entry.target as HTMLImageElement;
      if (entry.intersectionRatio > 0) {
        this.renderer.removeClass(img, 'invisible');
      } else {
        this.renderer.addClass(img, 'invisible');
        console.log(`Hide image ${img.id} to reduce memory usage`);
      }
      if (entry.intersectionRatio > 0.25) {
        if (img.dataset.src) {
          lazyLoadImage(img)
            .then(() => delete img.dataset.src)
            .catch((err) => console.error(err));
        }
      }
    });
  }
}
