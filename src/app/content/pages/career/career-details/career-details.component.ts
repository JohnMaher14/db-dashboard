import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CareersService } from 'src/app/services/careers.service';
import { Title } from "@angular/platform-browser";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
@Component({
  selector: 'app-career-details',
  templateUrl: './career-details.component.html',
  styleUrls: ['./career-details.component.scss']
})
export class CareerDetailsComponent implements OnInit {

  pageName: string = 'Careers Categories'
  success: string = '';
  error: string = '';
  delete: string = '';
  ckeditorContent:any;
  ckeditorContentText:any;
  currentJob: any;
  idNumber!:number;
  modalRef!:BsModalRef;
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  modalEdit: any;
  constructor(
    private _BsModalService:BsModalService,
    private _CareersService:CareersService,
    private _ActivatedRoute:ActivatedRoute,
    private _Title:Title
  ) { }
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  createJob: FormGroup = new FormGroup({
    en_job_desc_title: new FormControl('', Validators.required),
    ar_job_desc_title: new FormControl('', Validators.required),
    en_job_desc_text: new FormControl('', Validators.required),
    ar_job_desc_text: new FormControl('', Validators.required),
    en_about_job_text: new FormControl('', Validators.required),
    ar_about_job_text: new FormControl('', Validators.required),
    en_job_req_title: new FormControl('', Validators.required),
    ar_job_req_title: new FormControl('', Validators.required),
    en_job_req_text: new FormControl('', Validators.required),
    ar_job_req_text: new FormControl('', Validators.required),
    experience_needed: new FormControl('', Validators.required),

  })
  openModal(createModal:any){

    this.modalRef = this._BsModalService.show(createModal
      ,{
        class: 'modal-dialog-centered'
      });
      this.createJob.reset()

  }
  showCareers(){
    this._ActivatedRoute.paramMap.subscribe(
      (params:Params)=> {

        this.loading = true
        this.idNumber = params['params'].id
        this._CareersService.getJobs(params['params'].id).subscribe(
          (response) => {
            this.currentJob = response.jobCategory;
            this._Title.setTitle(`Digital Bond | ${response.jobCategory?.en_title}`)

            this.loading = false


          }
        )
      }
    )
  }
  onCreate(
    createJob:FormGroup
  ){
    let createJobForm = {
      en_job_desc_title: this.createJob.value.en_job_desc_title,
      ar_job_desc_title: this.createJob.value.ar_job_desc_title,
      en_job_desc_text: this.createJob.value.en_job_desc_text,
      ar_job_desc_text: this.createJob.value.ar_job_desc_text,
      en_about_job_text: this.createJob.value.en_about_job_text,
      ar_about_job_text: this.createJob.value.ar_about_job_text,
      en_job_req_title: this.createJob.value.en_job_req_title,
      ar_job_req_title: this.createJob.value.ar_job_req_title,
      en_job_req_text: this.createJob.value.en_job_req_text,
      ar_job_req_text: this.createJob.value.ar_job_req_text,
      experience_needed: this.createJob.value.experience_needed,
      category_id:this.idNumber
    }
    this.loadingAction = true;
    this._CareersService.createJob(
      createJobForm
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showCareers();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createJob.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  onEdit(
    idEdit:any , updateModal:any
  ){
    // this.loadingAction = true;
    this.modalRef = this._BsModalService.show(updateModal
      ,{
        class: 'modal-dialog-centered'
      })
    this._CareersService.getJobDetails(idEdit).subscribe(
      (response) => {

        this.modalEdit = response.job
      }
    )
  }
  onUpdate(
    createCareer:FormGroup,
    id:number
  ){
    this.loadingAction = true;
    let updateJobForm = {
      en_job_desc_title: this.createJob.value.en_job_desc_title,
      ar_job_desc_title: this.createJob.value.ar_job_desc_title,
      en_job_desc_text: this.createJob.value.en_job_desc_text,
      ar_job_desc_text: this.createJob.value.ar_job_desc_text,
      en_about_job_text: this.createJob.value.en_about_job_text,
      ar_about_job_text: this.createJob.value.ar_about_job_text,
      en_job_req_title: this.createJob.value.en_job_req_title,
      ar_job_req_title: this.createJob.value.ar_job_req_title,
      en_job_req_text: this.createJob.value.en_job_req_text,
      ar_job_req_text: this.createJob.value.ar_job_req_text,
      experience_needed: this.createJob.value.experience_needed,
      category_id:this.idNumber
    }
    this._CareersService.updateJob(
      id,
      updateJobForm
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = 'Job updated successfully'
          this.error = ''
          this.delete = ''
          this.showCareers();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createJob.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  onDelete(id:number){
    if(confirm(`Are you sure to delete job with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.deleteJob(id ).subscribe(
        (response) => {
          if (response.success) {
            this.delete = response.success;
            this.error = '';
            this.success = '';
            this.loadingAction = false;

            this.showCareers();

          }
        }
      )
    }
  }
  onDisable(id:number){
    if(confirm(`Are you sure to disable job with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.disableJob(id ).subscribe(
        (response) => {
          if (response.success) {
            this.delete = response.success;
            this.error = '';
            this.success = '';
            this.loadingAction = false;

            this.showCareers();

          }
        }
      )
    }
  }
  onRecover(id:number){
    if(confirm(`Are you sure to recover job with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.recoverJob(id ).subscribe(
        (response) => {
          if (response.success) {
            this.delete = '';
            this.error = '';
            this.success = response.success;
            this.loadingAction = false;

            this.showCareers();

          }
        }
      )
    }
  }
  ngOnInit(): void {
    this.showCareers();

  }

}
