import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isLogined:boolean = false;
  constructor(
    private _AuthService:AuthService
  ) {
    _AuthService.currentUserData.subscribe(()=>{
      if (_AuthService.currentUserData.getValue() == null) {
        this.isLogined = false;

      }
      else{
        this.isLogined = true;
      }
    })
  }

  ngOnInit(): void {
  }

}
