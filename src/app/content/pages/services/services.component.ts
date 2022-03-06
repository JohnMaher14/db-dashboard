import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators , FormControl } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  success: string = '';
  error: string = '';
  delete: string = '';
  services: any[] =[];
  @ViewChild('createModal') modal!: ElementRef;

  serviceImage ='https://digitalbondmena.com/services/'
  constructor(
    private _ServiceService:ServiceService
  ) { }

  ngOnInit(): void {
    this.showServices()
  }

  createService = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    icon : new FormControl(null, Validators.required),
    image : new FormControl(null, Validators.required),
    banner_image : new FormControl(null, Validators.required),
  })

  icon(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      icon: file
    })
    this.createService.get('icon')?.updateValueAndValidity()
  }
  image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      image: file
    })
    this.createService.get('image')?.updateValueAndValidity()
  }
  banner_image(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createService.patchValue({
      banner_image: file
    })
    this.createService.get('banner_image')?.updateValueAndValidity()
  }
  showServices(){
    this._ServiceService.getServices().subscribe(
      (response) => {
        this.services = response.rows
      }
    )
  }
  onDelete(id:number , data:any){
    this._ServiceService.deleteService(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.showServices();
        }
      }
    )
  }
  onCreate(){
    this._ServiceService.CreateService(
      this.createService.value.en_title,
      this.createService.value.ar_title,
      this.createService.value.en_text,
      this.createService.value.ar_text,
      this.createService.value.icon,
      this.createService.value.image,
      this.createService.value.banner_image,

    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showServices();
          this.createService.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
