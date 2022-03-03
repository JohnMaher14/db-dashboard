import { Component, OnInit } from '@angular/core';
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
