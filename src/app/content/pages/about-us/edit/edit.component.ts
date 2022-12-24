import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { AboutService } from 'src/app/services/about.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  error:string = '';
  success:string = '';
  shortLink: string = "";
  aboutusEdit!:FormGroup;
  aboutUsData:any;
  loadingAction!:boolean;
  aboutLink= 'https://digitalbondmena.com/about_us_page/';

  constructor(
    private _AboutService:AboutService,
    private _FormBuilder:FormBuilder,
    private _Title:Title,
    private _Router:Router
  ) {
    this.aboutusEdit = this._FormBuilder.group({
      en_about_section_title: [''],
      ar_about_section_title: [''],
      en_about_section_text: [''],
      ar_about_section_text: [''],
      en_vision_title: [''],
      ar_vision_title: [''],
      en_vision_text: [''],
      ar_vision_text: [''],
      en_mission_title: [''],
      ar_mission_title: [''],
      en_mission_text: [''],
      ar_mission_text: [''],
      about_banner_image: [null],
      // about_section_image: [null],
      // mission_vision_image: [null],
    })
  }
  aboutUsFormData(){
    this._AboutService.getAboutUsTable().subscribe(
      (response) => {
        this.aboutUsData = response.rows
      }
    )
  }
  ngOnInit(): void {
    this.aboutUsFormData()
    this._Title.setTitle(`Digital bond | About us edit`)

  }
  onChangeFile1(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      about_banner_image: file
    })
    this.aboutusEdit.get('about_banner_image')?.updateValueAndValidity()
  }
  onChangeFile2(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      about_section_image: file
    })
    this.aboutusEdit.get('about_section_image')?.updateValueAndValidity()
  }
  onChangeFile3(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.aboutusEdit.patchValue({
      mission_vision_image: file
    })
    this.aboutusEdit.get('mission_vision_image')?.updateValueAndValidity()
  }
  // onChangeFile2(event:any){
  //   const file = event.target.files ? event.target.files[0] : '';
  //   this.aboutusEdit.patchValue({
  //     about_section_image: file
  //   })
  //   this.aboutusEdit.get('about_section_image')?.updateValueAndValidity()
  //   console.log(file);
  // }
  // onChangeFile3(event:any){
  //   const file = event.target.files ? event.target.files[0] : '';
  //   this.aboutusEdit.patchValue({
  //     mission_vision_image: file
  //   })
  //   this.aboutusEdit.get('mission_vision_image')?.updateValueAndValidity()
  // }

  onSubmit(){
    this.loadingAction = true;
    this._AboutService.UpdateAboutUs(
      this.aboutusEdit.value.en_about_section_title,
      this.aboutusEdit.value.ar_about_section_title,
      this.aboutusEdit.value.en_about_section_text,
      this.aboutusEdit.value.ar_about_section_text,
      this.aboutusEdit.value.en_vision_title,
      this.aboutusEdit.value.ar_vision_title,
      this.aboutusEdit.value.en_vision_text,
      this.aboutusEdit.value.ar_vision_text,
      this.aboutusEdit.value.en_mission_title,
      this.aboutusEdit.value.ar_mission_title,
      this.aboutusEdit.value.en_mission_text,
      this.aboutusEdit.value.ar_mission_text,
      this.aboutusEdit.value.about_banner_image,
      // this.aboutusEdit.value.about_section_image,
      // this.aboutusEdit.value.mission_vision_image
    ).subscribe(
      (response) => {
        this.success = response.body?.success;
        this.loadingAction= false;
            setTimeout(() => {
              this._Router.navigate(['/about-us']);
            }, 2000);
      }, error => {
          this.error = error.error.error;
          this.loadingAction= false;

      }
    )

  }

}
