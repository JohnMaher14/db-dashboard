import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CasestudyService } from 'src/app/services/casestudy.service';

@Component({
  selector: 'app-case-study-models',
  templateUrl: './case-study-models.component.html',
  styleUrls: ['./case-study-models.component.scss']
})
export class CaseStudyModelsComponent implements OnInit {
  caseStudyModels: any[]=[];
  indexForNumbers!:number;
  caseStudyImage:string ='https://digitalbondmena.com/case-study/'
  success: string = '';
  error: string = '';
  delete: string = '';
  loading:boolean = false;
  loadingAction:boolean = false;

  modalRef!:BsModalRef;
  fullscreed: boolean = false;
  fullScreen(){
    this.fullscreed = !this.fullscreed
  }
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _CasestudyService:CasestudyService,
    private _BsModalService:BsModalService,
    private _Title:Title
  ) {
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

  }
  openModal(template:any){

    this.modalRef = this._BsModalService.show(template
      ,{
        class: 'modal-dialog-centered'
      }
  );
  }
  ngOnInit(): void {
    this.showCaseStudyModel()
    this._Title.setTitle(`Digital Bond | Case studies model`)

  }
  showCaseStudyModel(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];

    this._CasestudyService.getCaseStudyModel(this.indexForNumbers).subscribe(
      (response) => {
        // console.log(response.caseStudyModels);
        this.caseStudyModels = response.caseStudyModels
        console.log(response.caseStudyModels);
      }
    )
  }
  createCaseStudyModel = new FormGroup({

    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('..'),
    ar_text : new FormControl('..'),
    case_id : new FormControl('', Validators.required),
  })
  onDelete(id:number , data:any){
    if(confirm(`Are you sure to delete case study model with id ${id}`)) {
      this.loadingAction = true;
    this._CasestudyService.deleteCaseStudyModel(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.loadingAction = false;
          this.showCaseStudyModel()

        }
      }
    )
    }
  }
  onCreate(formData:FormGroup){
    this.loadingAction = true;
    this._CasestudyService.createCaseStudyModel(
      formData.value
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success;
          this.error = '';
          this.delete = '';
          this.modalRef.hide()
          this.loadingAction = false;
          this.showCaseStudyModel();

          this.createCaseStudyModel.reset();
        }else{

          console.log(response);
        }
      }
    )
  }
}
