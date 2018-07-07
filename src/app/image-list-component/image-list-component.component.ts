import { Component, OnInit, AfterViewInit, QueryList, ViewChildren, ElementRef } from '@angular/core';
import { WindowRef } from '../WindowRef';

const option = {
  root: null,
  rootMargin: '0px',
  threshold: [0, 0.5]
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
    console.log(this.images);
  }

  observerCallback() {}

}
