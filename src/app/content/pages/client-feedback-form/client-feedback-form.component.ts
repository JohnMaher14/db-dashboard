import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientsService } from 'src/app/services/clients.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-client-feedback-form',
  templateUrl: './client-feedback-form.component.html',
  styleUrls: ['./client-feedback-form.component.scss']
})
export class ClientFeedbackFormComponent implements OnInit {

  success: string = '';
  error: string = '';
  delete: string = '';
  clients: any[] =[];
  modalRef!:BsModalRef;
  seeMore = false;
  pageName: string ='Clients Form';
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  page!:number;
  searchText!: string;
  minDate = new Date();
  maxDate = new Date();
  bsRangeValue!: Date[];
  today:any;
  bsValue = new Date();
  date = new DatePipe('en-US');
  isFiltered!:boolean;
  modalEdit : any;

  fullScreen(){
    this.fullscreed = !this.fullscreed
  }


  clientImage ='https://digitalbondmena.com/ClientReviews/'
  constructor(
    private _ClientsService:ClientsService,
    private _Title:Title,
    private _BsModalService:BsModalService,
    private _ToastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.showCLientsFeedback()
    this._Title.setTitle(`Digital Bond | Clients form`)
    this.getDate()
  }
  getDate(){
    this.today = this.date.transform(Date.now(), 'yyyy-MM-dd');
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    console.log(this.bsValue , this.bsRangeValue);
  }
  editClientForm= new FormGroup({
    'client_name' : new FormControl('' , Validators.required),
    'client_position' : new FormControl('' , Validators.required),
    'most_positives' : new FormControl('' , Validators.required),
    'points_considered' : new FormControl('' , Validators.required),
    'start_count' : new FormControl('' , Validators.required),
    'client_image' : new FormControl(''),

  })
  // form
  filter = new FormGroup({
    'date' : new FormControl('' , Validators.required),
  })
  onSubmit( filter:FormGroup){
    this.loadingAction = true;
    this._ClientsService.filterClientsFeedbackForm(
      this.date.transform(filter.value.date[0] , 'yyyy-MM-dd')+'-'+this.date.transform(filter.value.date[1] , 'yyyy-MM-dd')
    ).subscribe(
      (response) => {
        // console.log(response);
        this.clients = response.rows.filter(
          (clients:any) => clients.client_name != null
          )
          this.loadingAction = false;
          this.isFiltered = true;

        }
        )
        // console.log(this.date.transform(filter.value.date[0] , 'MM/dd/yyyy')+'-'+this.date.transform(filter.value.date[1] , 'MM/dd/yyyy'));
        console.log(this.filter.value);

  }
  // onupdate
  onEdit(
    idEdit:number , updateModal:any
  ){

    this.loadingAction = true;
    this.modalRef = this._BsModalService.show(updateModal
      ,{
        class: 'modal-dialog-centered'
      })
    this._ClientsService.getClientFormDetails(idEdit).subscribe(
      (response) => {
        console.log(response.ClientReview);

        this.modalEdit = response.ClientReview
        this.loadingAction = false
      }
    )
  }
  // image
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.editClientForm.patchValue({
      client_image: file
    })
    this.editClientForm.get('client_image')?.updateValueAndValidity()
  }
  onUpdate(id:number){
    this.loadingAction = true;
    this._ClientsService.updateClientPhoto(
      id,
      this.editClientForm.value.client_name,
      this.editClientForm.value.client_position,
      this.editClientForm.value.most_positives,
      this.editClientForm.value.points_considered,
      this.editClientForm.value.start_count,
      this.editClientForm.value.client_image
    ).subscribe(
      (response) =>{
        console.log(response);
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showCLientsFeedback();
          this.modalRef.hide();
          this.loadingAction = false;

        }else{

          console.log(response);
        }
      }, error => {
        if(error.status == 422){
          console.log(error);

        }
      }
    )
  }
  // copy to clipboard
  copyToClipboard(element:any , name:string) {
    const event = (e: any) => {
      e.clipboardData?.setData('text/plain', element);
      e.preventDefault();
      // ...('copy', e), as event is outside scope
      document.removeEventListener('copy', e);
    }
    document.addEventListener('copy', event);
    document.execCommand('copy');
    this._ToastrService.success( 'Success!', `${name} copied to clipboard.` , {
      timeOut: 2500
    });
  }

  showCLientsFeedback(){
    this.loading = true
    this._ClientsService.getClientsFeedbackForm().subscribe(
      (response) => {

        this.clients = response.rows.filter(
          (clients:any) => clients.client_name != null
        )
        this.loading = false
        this.isFiltered = false;
          this.filter.reset()
      }
    )
  }


}
