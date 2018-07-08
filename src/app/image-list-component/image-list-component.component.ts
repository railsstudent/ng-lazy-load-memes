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
  urls = [
    { placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-01-720x539.jpg'
    },
    { placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-02-720x932.jpg'
    },
    { placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-03-720x697.jpg'
    },
    { placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-04-720x540.jpg'
    },
    { placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-05-720x530.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-06-720x504.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-07-720x950.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-08-720x519.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-09-720x662.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-10-720x885.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-11-720x540.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-12-720x463.jpg'
    },
    {
      placeholder: 'https://via.placeholder.com/600x480',
      actual: 'https://winkgo.com/wp-content/uploads/2018/05/55-Funniest-Cat-Memes-Ever-17-720x520.jpg'
    }
  ];

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
