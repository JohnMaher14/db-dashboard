import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {AboutService} from 'src/app/services/about.service'
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  AboutUs!: any;
  aboutUsImage:string = 'https://digitalbondmena.com/about_us_page/'
  constructor(
    private _AboutService:AboutService
  ) { }
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

  showAboutus(){
    this._AboutService.getAboutUsTable().subscribe(
      (response) => {
        this.AboutUs = response.rows
        console.log(response.rows);
      }
    )
  }

  ngOnInit(): void {
    this.showAboutus()
  }

}
