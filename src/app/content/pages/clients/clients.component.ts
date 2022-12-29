import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Title } from '@angular/platform-browser';
import { BsModalService , BsModalRef} from 'ngx-bootstrap/modal';
import { ClientsService } from 'src/app/services/clients.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',

  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  pageName: string = 'Clients & Partners'
  success: string = '';
  error: string = '';
  delete: string = '';
  clients: any[] =[];
  modalRef!: BsModalRef;
  config:any;
  page:any;
  priorityNumber: any[] = [];
  modalEdit:any;
  checboxes!:boolean;
  clientImage ='https://digitalbondmena.com/clients/';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  currentPage = 1;
  term:any;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _ClientsService:ClientsService,
    private _Title:Title,

    public modalService: BsModalService  ) {
      this.config = {
        itemsPerPage: 5,
        currentPage: 1,
      };
     }

  ngOnInit(): void {
    this.showClients()
    this._Title.setTitle(`Digital bond | clients`)
    this.createClient.get('web_dev_status')?.setValue(0)
    this.createClient.get('mobile_app_status')?.setValue(0)
    this.createClient.get('social_media_status')?.setValue(0);
    this.checboxes = false;

  }

  createClient = new FormGroup({
    en_title : new FormControl('', Validators.required),
    en_text : new FormControl('..'),
    ar_title : new FormControl('..', Validators.required),
    ar_text : new FormControl('..' , ),
    type : new FormControl('', Validators.required),
    priority_number : new FormControl(null),
    social_media_status : new FormControl(''),
    mobile_app_status : new FormControl(''),
    web_dev_status : new FormControl(''),
    logo : new FormControl(null ),
  })


  logo(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createClient.patchValue({
      logo: file
    })
    this.createClient.get('logo')?.updateValueAndValidity()
  }

  openModal(template: any) {
    this.modalRef = this.modalService.show(template
      ,{
        class: 'modal-dialog-centered'
      })
      this.createClient.controls['en_title'].reset()
      this.createClient.controls['ar_title'].reset()
      this.createClient.controls['social_media_status'].reset()
      this.createClient.controls['mobile_app_status'].reset()
      this.createClient.controls['web_dev_status'].reset()
      this.createClient.controls['logo'].reset()
  }
  pageChanged(event:any){
    this.config.currentPage = event;
  }
  onChangeSocial(targetValue:any){
    if(targetValue.target.checked === true){
      this.createClient.get('social_media_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createClient.get('social_media_status')?.patchValue(0)
    }
  }
  onChangeWeb(targetValue:any){
    if(targetValue.target.checked === true){
      this.createClient.get('web_dev_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createClient.get('web_dev_status')?.patchValue(0)
    }
  }
  onChangeMobile(targetValue:any){
    if(targetValue.target.checked === true){
      this.createClient.get('mobile_app_status')?.patchValue(1)
    }else if(targetValue.target.checked === false){
      this.createClient.get('mobile_app_status')?.patchValue(0)
    }
  }

  showClients(){
    this.loading = true
    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clients = response.rows
        this.loading = false;
        let priorityNumber = Math.max(...response.arrayData) ;
        let arrayOfNotAvailableNumbers = response.arrayData.sort(function(a:any, b:any) {
          return a - b;
        });;
        
        console.log(arrayOfNotAvailableNumbers);
        var numArray = arrayOfNotAvailableNumbers;
        var mia = numArray.reduce(function(acc:any, cur:any, ind:any, arr:any) {
          var diff = cur - arr[ind-1];
          if (diff > 1) {
            var i = 1;
            while (i < diff) {
              acc.push(arr[ind-1]+i);
              i++;
            }
          }
          return acc;
        }, []);
        let lastIndexOfArray = Array.from(mia).slice(-1)[0]
        function range(start:any) {
          const mylength = 11 - Array.from(mia).length;
          return Array.from({ length: mylength }, (_, i) => start + i);
          }
          const myArr = range(lastIndexOfArray);
          let arrayRange = myArr.concat(Array.from(mia))

          let filtered  = arrayRange.filter(val => !arrayOfNotAvailableNumbers.includes(val) ).sort();

          this.priorityNumber = [...new Set(filtered)];
      }
    )
  }

  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete client with id ${id}`)) {

    this.loadingAction = true
    this._ClientsService.deleteClient(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success;
          this.error = '';
          this.success = '';
          this.loadingAction = false

          this.showClients();
        }
      }
    )
    }
  }
  onChangeTypeFilter(event:any){
    if(event.target.value === 'happy'){

      this.loading = true
      this._ClientsService.getClients().subscribe(
        (response) => {
          let partnerArray = response.rows.filter(
            (responseFilter:any) => {
              return responseFilter.type == 'happy'
            }
          )
          this.clients = partnerArray
          this.loading = false
        }
      )
    }else if(event.target.value === 'case'){
      this.loading = true
      this._ClientsService.getClients().subscribe(
        (response) => {
          let clientsArray = response.rows.filter(
            (responseFilter:any) => {
              return responseFilter.type == 'case'
            }
          )
          this.clients = clientsArray
          this.loading = false
        }
      )
    }else{
      this.loading = true
      this._ClientsService.getClients().subscribe(
        (response) => {

          this.clients = response.rows
          this.loading = false
        }
      )
    }
  }
  onChangeType(targetValue: any){
    if(targetValue.target.value === 'happy'){
      this.checboxes = false;
      this.createClient.get('web_dev_status')?.setValue(0);
      this.createClient.get('mobile_app_status')?.setValue(0);
      this.createClient.get('social_media_status')?.setValue(0);
    }else if(targetValue.target.value === 'case'){
      this.checboxes = true;
      this.createClient.get('web_dev_status')?.setValue(0)
      this.createClient.get('mobile_app_status')?.setValue(0)
      this.createClient.get('social_media_status')?.setValue(0);

    }else{
      this.checboxes = false
    }

  }
  onCreate(createClient:FormGroup){
    console.log(createClient.value);
      this.loadingAction = true

    this._ClientsService.CreateClient(
      this.createClient.value.en_title,
      this.createClient.value.ar_title,
      this.createClient.value.en_text,
      this.createClient.value.ar_text,
      this.createClient.value.type,
      this.createClient.value.logo,
      this.createClient.value.priority_number,
      this.createClient.value.social_media_status,
      this.createClient.value.mobile_app_status,
      this.createClient.value.web_dev_status
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showClients()
          this.modalRef.hide()
          this.loadingAction = false

          this.createClient.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
  // on update
  onEdit(
    idEdit:number , updateModal:any
  ){
    // this.loadingAction = true;
    this.modalRef = this.modalService.show(updateModal
      ,{
        class: 'modal-dialog-centered'
      })
      this.loadingAction = true;
    this._ClientsService.getClientDetails(idEdit).subscribe(
      (response) => {
        this.loadingAction = false;

        this.modalEdit = response.client
        // console.log(filteredArray);
      }
    )
  }
  onUpdate(id:number , createClient:FormGroup ){

    this.loadingAction = true;
    this._ClientsService.updateClient(
      id,
      this.createClient.value.en_title,
      this.createClient.value.ar_title,
      this.createClient.value.en_text,
      this.createClient.value.ar_text,
      this.createClient.value.type,
      this.createClient.value.logo,
      this.createClient.value.priority_number,
      this.createClient.value.social_media_status,
      this.createClient.value.mobile_app_status,
      this.createClient.value.web_dev_status
    ).subscribe(
      (response) =>{
        console.log(response);
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showClients();
          this.modalRef.hide();
          this.loadingAction = false;

          this.createClient.reset();
        }else{

          console.log(response);
        }
      }, error => {
        if(error.status == 422){
          this._ClientsService.updateClientNull(
            id,
            this.createClient.value.en_title,
            this.createClient.value.ar_title,
            this.createClient.value.en_text,
            this.createClient.value.ar_text,
            this.createClient.value.type,
            this.createClient.value.priority_number,
            this.createClient.value.social_media_status,
            this.createClient.value.mobile_app_status,
            this.createClient.value.web_dev_status
          ).subscribe(
            (response) => {
              if(response.success){
                this.success = response.success
                this.error = ''
                this.delete = ''
                this.showClients();
                this.modalRef.hide();
                this.loadingAction = false;

                this.createClient.reset();
              }else{

                console.log(response);
              }
            }
          )
        }
      }
    )
  }
}
