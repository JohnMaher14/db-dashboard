import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  GoFullScreen(){

    let elem:any = document.documentElement;
    let methodToBeInvoked = elem.requestFullscreen ||
    elem.webkitRequestFullScreen || elem['mozRequestFullscreen']
    ||
    elem['msRequestFullscreen'];
    if (methodToBeInvoked){
      methodToBeInvoked.call(elem)
    }else{
      return elem;
    }
  }
}
