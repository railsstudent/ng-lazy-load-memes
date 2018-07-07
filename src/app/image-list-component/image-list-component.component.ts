import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import { WindowRef } from '../WindowRef';
import { fetchImage, lazyLoadImage } from './util';

const option = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.25]
};

@Component({
  selector: 'app-image-list-component',
  templateUrl: './image-list-component.component.html',
  styleUrls: ['./image-list-component.component.scss']
})
export class ImageListComponentComponent implements OnInit, AfterViewInit {

  observer: any;

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

  observerCallback(entries: IntersectionObserverEntry[], observer) {
    entries.forEach((entry) => {
      const img = entry.target as HTMLImageElement;
      if (entry.intersectionRatio > 0) {
        this.renderer.removeClass(img, 'invisible');
      } else {
        this.renderer.addClass(img, 'invisible');
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
