import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-banner-images',
  templateUrl: './banner-images.component.html',
  styleUrls: ['./banner-images.component.scss']
})
export class BannerImagesComponent implements OnInit {

  banners:any;
  bannerUrl: string ='https://digitalbondmena.com/banner_images/';
  fullscreed: boolean = false;
  loading: boolean = false;

  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _HomeService:HomeService,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.showBanners();
    this._Title.setTitle(`Digital Bond | Banner images`)

  }
  showBanners(){
    this.loading = true
    this._HomeService.getBannerImage().subscribe(
      (response) => {
        this.banners = response.rows
        this.loading = false
      }
    )
  }
  mainSlider: OwlOptions = {
    loop: true,
    dots: false,
    autoplay: false,
    navSpeed: 700,
    nav: false,

    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 1
      },

      1024: {
        items: 1
      }
    }
  }
}
