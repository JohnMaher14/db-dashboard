import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FeedbacksService } from 'src/app/services/feedbacks.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  pageName:string='Feedbacks'
  feedbacks: any[] =[];
  success: string ='';
  error: string ='';
  delete: string ='';
    modalRef!:BsModalRef;
    loading: boolean = false;
    loadingAction: boolean = false;
  feedbackImage ='https://digitalbondmena.com/feedbacks/'
  fullscreed: boolean = false;
  currentPage = 1
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _FeedbacksService:FeedbacksService,
        private modalService:BsModalService,
        private _Title:Title

  ) { }
    openModal(template:any){

      this.modalRef = this.modalService.show(template
        ,{
          class: 'modal-dialog-centered'
        }

        );
    }

  showFeedbacks(){
    this.loading = true
    this._FeedbacksService.getFeedbacks().subscribe(
      (response) => {
        this.feedbacks = response.rows
        this.loading = false
      }
    )
  }
  // en_name :
  // ar_name :
  // en_role :
  // ar_role :
  // en_feedback :
  // ar_feedback :
  // status :
  // image
  createFeedback = new FormGroup({
    en_name : new FormControl('', Validators.required),
    en_role : new FormControl('', Validators.required),
    en_feedback : new FormControl('', Validators.required),
    status : new FormControl('', Validators.required),
    ar_name : new FormControl('', Validators.required),
    ar_role : new FormControl('', Validators.required),
    ar_feedback : new FormControl('', Validators.required),
    client_image : new FormControl('', Validators.required),
    feedback_star: new FormControl('')
  })

  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createFeedback.patchValue({
      client_image: file
    })
    this.createFeedback.get('client_image')?.updateValueAndValidity()
  }

  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete feedback with id ${id}`)) {
      this.loadingAction = true
      this._FeedbacksService.deleteFeedback(id,data ).subscribe(
        (response) => {
          if (response.success) {
            this.delete = response.success
            this.error = ''
            this.success = ''
            this.showFeedbacks();
            this.loadingAction = false

          }
        }
      )
    }
  }
  onCreate(createFeedback:FormGroup){
    this.loadingAction = true
    this._FeedbacksService.CreateFeedback(
      this.createFeedback.value.en_name,
      this.createFeedback.value.ar_name,
      this.createFeedback.value.en_role,
      this.createFeedback.value.ar_role,
      this.createFeedback.value.en_feedback,
      this.createFeedback.value.ar_feedback,
      this.createFeedback.value.status,
      this.createFeedback.value.client_image,
      this.createFeedback.value.feedback_star
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showFeedbacks();
          this.modalRef.hide();
          this.loadingAction = false
          this.createFeedback.reset();
        }else{

          console.log(response);
        }
      }
    )
    // console.log(createFeedback);
  }
  ngOnInit(): void {
    this.showFeedbacks()
    this._Title.setTitle(`Digital Bond | Feedbacks`)

  }
}
