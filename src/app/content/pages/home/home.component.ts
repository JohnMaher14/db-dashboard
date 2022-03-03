import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  home:any;
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
}
