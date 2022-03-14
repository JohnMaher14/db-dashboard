import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  caseStudyStatistics!:number;
  clientsStatistics!:number;
  feedbacksStatistics!:number;
  page!:number;
  modalRef!:BsModalRef;
  clientMessages: any[] =[];
  loading: boolean = false;
  constructor(
    private _ClientsService:ClientsService,
    private _FeedbacksService:FeedbacksService,
    private _CasestudyService:CasestudyService,
    private _Title:Title
  ) { }

  showClientsLength(){
    this.loading = true
    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clientsStatistics = response.rows.length
        this.loading = false
      }
    )
  }
  showCaseStudyLength(){
    this.loading = true

    this._CasestudyService.getCaseStudy().subscribe(
      (response) => {
        this.caseStudyStatistics = response.rows.length;
        this.loading = false

      }
    )
  }
  showClientMessage(){
    this.loading= true
    this._FeedbacksService.getClientMessages().subscribe(
      (response) => {
        this.clientMessages = response.rows;
        this.loading= false;

      }
    )

  }

  showFeedbacksLength(){
    this.loading = true

    this._FeedbacksService.getFeedbacks().subscribe(
      (response) => {
        this.feedbacksStatistics = response.rows.length;
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
    this.showClientsLength();
    this.showCaseStudyLength();
    this.showFeedbacksLength();
    this.showClientMessage();
    this._Title.setTitle(`Digital Bond | Home`)
  }
}
