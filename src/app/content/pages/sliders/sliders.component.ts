import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SliderService } from 'src/app/services/slider.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

  pageName: string = 'Sliders'
  success: string = '';
  error: string = '';
  delete: string = '';
  sliders: any[] =[];
  modalRef!:BsModalRef;
  sliderImage ='https://digitalbondmena.com/sliders/'
  constructor(
    private _SliderService:SliderService,
    private _Router:Router,
    private _BsModalService:BsModalService
  ) { }

  ngOnInit(): void {
    this.showSliders()
  }
  openModal(template:any){

    this.modalRef = this._BsModalService.show(template);
  }
  sliderForm = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    image : new FormControl(null, Validators.required),
  })

  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.sliderForm.patchValue({
      image: file
    })
    this.sliderForm.get('image')?.updateValueAndValidity()
  }


  showSliders(){
    this._SliderService.getSlider().subscribe(
      (response) => {
        this.sliders = response.rows
      }
    )
  }
  onDelete(id:number , data:any){
    this._SliderService.deleteSlider(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.showSliders();
        }
      }
    )
  }
  onCreate(){
    this._SliderService.createSlider(
      this.sliderForm.value.en_title,
      this.sliderForm.value.ar_title,
      this.sliderForm.value.en_text,
      this.sliderForm.value.ar_text,
      this.sliderForm.value.image,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.modalRef.hide()
          // this._Router.navigate(['/sliders'])\
          this.showSliders()
          this.sliderForm.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
