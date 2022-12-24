import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {
  success: any = '';
  error: any = '';
  modal: any;
  service:any;
  indexForNumbers: any;
  loadingAction!:boolean;
  serviceImage ='https://digitalbondmena.com/services/';
  constructor(
    private _ServiceService:ServiceService,
    private _ActivatedRoute:ActivatedRoute,
    private _Router:Router,
    private _Title:Title
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._ServiceService.getServiceDetails(this.indexForNumbers).subscribe(
      (response) => {
        this.service = response.service[0]
        this._Title.setTitle(`Digital Bond | ${response.service[0]?.en_title}`);

      }
    )
  }

  updateService = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('..', Validators.required),
    ar_text : new FormControl('..'),
    en_text : new FormControl('..'),
    icon : new FormControl(null)
  })
  updateServiceNull = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('..', Validators.required),
    ar_text : new FormControl('..'),
    en_text : new FormControl('..'),
  })
  icon(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.updateService.patchValue({
      icon: file
    })
    this.updateService.get('icon')?.updateValueAndValidity()
  }


  onUpdate(){
    this.loadingAction = true;
    this._ServiceService.updateService(
      this.indexForNumbers,
      this.updateService.value.en_title,
      this.updateService.value.ar_title,
      this.updateService.value.ar_text,
      this.updateService.value.en_text,
      this.updateService.value.icon
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = '';
          this.loadingAction = false;

          setTimeout(() => {
            this._Router.navigate(['/services']);
          }, 3000);
        }
      }
      , error => {
        if (error.status === 422) {
          this.error = error.error.message
          this._ServiceService.updateServiceNull(
            this.indexForNumbers,
            this.updateService.value.en_title,
            this.updateService.value.ar_title,
            this.updateService.value.ar_text,
            this.updateService.value.en_text,
          ).subscribe(
            (response)=> {
              if(response.success){
                this.success = response.success
                this.error = ''
                setTimeout(() => {
                  this._Router.navigate(['/services']);
                }, 3000);
              }
            }
          )
          this.loadingAction = false;

        }
      }
    )
  }


}
