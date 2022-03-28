import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  success: string = '';
  error: string = '';
  delete: string = '';
  messages: any[] =[];
  modalRef!:BsModalRef;
  seeMore = false;
  pageName: string ='Messages';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  page!:number;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  serviceImage ='https://digitalbondmena.com/services/'
  constructor(
    private _FeedbacksService:FeedbacksService,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.showServices()
    this._Title.setTitle(`Digital Bond | Messages`)

  }




  showServices(){
    this.loading = true
    this._FeedbacksService.getClientMessages().subscribe(
      (response) => {
        this.messages = response.rows
        this.loading = false
      }
    )
  }


}
