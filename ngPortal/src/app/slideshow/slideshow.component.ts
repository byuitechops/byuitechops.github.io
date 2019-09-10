import { Component, OnInit } from '@angular/core';
import { SlideshowService } from '../core/slideshow.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {

    banners: any;
    current: 0;
    size: 0;

    constructor(public slide: SlideshowService) {
    }

    ngOnInit() {
        this.banners = this.slide.getActiveBanners();
        this.takeTurns();
    }

    takeTurns() {
        this.banners.forEach(banner => {
            if (banner != this.banners[this.current]) {
                banner.classList.add('hide');
            }
        });
    }
    prevSlide() {

    }
    nextSlide() {

    }
    nowThisSlide() {

    }

}
