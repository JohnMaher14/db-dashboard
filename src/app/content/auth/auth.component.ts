import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  error:string = '';
  constructor(
    private _AuthService:AuthService,
    private _Router:Router
  ) { }
  auth = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', Validators.required),
  })
  ngOnInit(): void {
  }
  submit(auth:FormGroup){
    this._AuthService.login(auth.value).subscribe(
      (response) => {
        if (response.message === 'sucess') {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this._Router.navigate(['/home'])
        }
      }, error => {
        if (error.status === 401) {

          this.error = error.error.error
        }
      }
    )

  }
}
