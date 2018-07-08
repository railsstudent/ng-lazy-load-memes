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
    { placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593811/15_eegbn0.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_533/v1526593811/15_eegbn0.webp'
    },
    { placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593811/14_alibgk.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_655/v1526593811/14_alibgk.webp'
    },
    { placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593811/13_w6cduy.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_532/v1526593811/13_w6cduy.webp'
    },
    { placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593810/11_sx2cpl.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_538/v1526593810/11_sx2cpl.webp'
    },
    { placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593810/10_glcemk.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_650/v1526593810/10_glcemk.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593810/08_kzi8xe.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_691/v1526593810/08_kzi8xe.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593810/07_loq0b4.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_703/v1526593810/07_loq0b4.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593809/05_t7l66e.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_613/v1526593809/05_t7l66e.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593809/04_t9shus.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_535/v1526593809/04_t9shus.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593809/03_fsaymj.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_715/v1526593809/03_fsaymj.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593809/02_walsxe.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_649/v1526593809/02_walsxe.webp'
    },
    {
      placeholder: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_10/v1526593809/01_r77clg.webp',
      actual: 'https://res.cloudinary.com/chuloo/image/upload/c_scale,w_653/v1526593809/01_r77clg.webp'
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
      console.log('callback fired');
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
