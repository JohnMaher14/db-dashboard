import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  pageName: string = 'Clients'
  success: string = '';
  error: string = '';
  delete: string = '';
  clients: any[] =[];

  clientImage ='https://digitalbondmena.com/clients/'
  constructor(
    private _ClientsService:ClientsService
  ) { }

  ngOnInit(): void {
    this.showClients()
  }

  createClient = new FormGroup({
    en_title : new FormControl('', Validators.required),
    ar_title : new FormControl('', Validators.required),
    en_text : new FormControl('', Validators.required),
    ar_text : new FormControl('', Validators.required),
    type : new FormControl('', Validators.required),
    logo : new FormControl(null, Validators.required),
  })

  logo(event:any){
    const file = event.target.files ? event.target.files[0] : '';
    this.createClient.patchValue({
      logo: file
    })
    this.createClient.get('logo')?.updateValueAndValidity()
  }

  showClients(){
    this._ClientsService.getClients().subscribe(
      (response) => {
        this.clients = response.rows
      }
    )
  }
  onDelete(id:number , data:any){
    this._ClientsService.deleteClient(id,data ).subscribe(
      (response) => {
        if (response.success) {
          this.delete = response.success
          this.error = ''
          this.success = ''
          this.showClients()
        }
      }
    )
  }
  onCreate(){
    this._ClientsService.CreateClient(
      this.createClient.value.en_title,
      this.createClient.value.ar_title,
      this.createClient.value.en_text,
      this.createClient.value.ar_text,
      this.createClient.value.type,
      this.createClient.value.logo,
    ).subscribe(
      (response) =>{
        if(response.success){
          this.success = response.success
          this.error = ''
          this.delete = ''
          this.showClients()
          this.createClient.reset();
        }else{

          console.log(response);
        }
      }
    )
  }

}
