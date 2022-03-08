import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  home:any;
  imageUrl='https://digitalbondmena.com/home_page/'
  constructor(
    private _HomeService:HomeService
  ) { }

  ngOnInit(): void {
    this.showHome()
  }
  showHome(){
    this._HomeService.getHome().subscribe(
      (response) => {
        this.home = response.rows
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
