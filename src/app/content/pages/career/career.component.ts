import { Component, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CareersService } from 'src/app/services/careers.service';
import { Title } from "@angular/platform-browser";
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  pageName: string = 'Careers Categories'
  success: string = '';
  error: string = '';
  delete: string = '';
  careersCategories: any[] =[];
  modalRef!:BsModalRef;
  fullscreed: boolean = false;
  loading: boolean = false;
  loadingAction: boolean = false;
  modalEdit: any;
  constructor(
    private _BsModalService:BsModalService,
    private _CareersService:CareersService,
    private _Title:Title
  ) { }
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  createJob: FormGroup = new FormGroup({
    en_title: new FormControl('', Validators.required),
    ar_title: new FormControl('', Validators.required),
    // ar_text: new FormControl('', Validators.required)
    en_text: new FormControl('..')
  })
  openModal(template:any){

    this.modalRef = this._BsModalService.show(template
      ,{
        class: 'modal-dialog-centered'
      });
  }
  showCareers(){
    this.loading = true
    this._CareersService.getCareers().subscribe(
      (response) => {

        this.careersCategories =  response.rows;
        this.loading = false


      }
    )
  }
  onCreate(
    createJob:FormGroup
  ){
    console.log(createJob.value);
    this.loadingAction = true;
    this._CareersService.createCareer(
      createJob.value
    ).subscribe(
      (response) =>{
        console.log(response);
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
  onDisable(id:number){
    if(confirm(`Are you sure to disable career with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.disableCareer(id ).subscribe(
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
  onDelete(id:number){
    if(confirm(`Are you sure to delete career category with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.deleteCareer(id ).subscribe(
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
    if(confirm(`Are you sure to recover career with id ${id}`)) {

      this.loadingAction = true;

      this._CareersService.recoverCareer(id ).subscribe(
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
  onEdit(
    idEdit:any , updateModal:any
  ){
    // this.loadingAction = true;
    this.modalRef = this._BsModalService.show(updateModal
      ,{
        class: 'modal-dialog-centered'
      })
    this._CareersService.getCareerDetails(idEdit).subscribe(
      (response) => {
        console.log(response.row);

        this.modalEdit = response.row
      }
    )

  }
  onUpdate(
    createCareer:FormGroup,
    id:number
  ){
    this.loadingAction = true;
    this._CareersService.updateCareer(
      id,
      createCareer.value
    ).subscribe(
      (response) =>{
        console.log(response);
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
  ngOnInit(): void {
    this.showCareers();
    this._Title.setTitle(`Digital Bond | Career categories`)

  }

}
