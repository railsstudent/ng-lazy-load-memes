import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
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

  constructor(private winRef: WindowRef) { }

  ngOnInit() {
    this.observer = new IntersectionObserver(this.observerCallback, option);
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
    console.log(entries);
    entries.forEach((entry) => {
      const img = entry.target;
      // const ratio = entry.intersectionRatio;
      console.log(img, img.id, entry.intersectionRatio);
    });
  }
}
