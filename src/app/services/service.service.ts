import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getServices(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}services_index`)
  }
  getServiceDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}service/${id}`)
  }
  CreateService(
    en_title: any,
    ar_title: any,
    ar_text: any,
    en_text: any,
    icon: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('ar_text',ar_text);
    formData.append('en_text',en_text);
    formData.append('icon',icon);
    return this._HttpClient.post(`${environment.apiUrl}services_store` , formData)
  }
  updateService(
    id:number,
    en_title: any,
    ar_title: any,
    ar_text: any,
    en_text: any,
    icon: File

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('ar_text',ar_text);
    formData.append('en_text',en_text);
    formData.append('icon',icon)
    return this._HttpClient.post(`${environment.apiUrl}services_update/${id}` , formData)
  }
  updateServiceNull(
    id:number,
    en_title: any,
    ar_title: any,
    ar_text: any,
    en_text: any,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('ar_text',ar_text);
    formData.append('en_text',en_text);
    return this._HttpClient.post(`${environment.apiUrl}services_update/${id}` , formData)
  }
  deleteService(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}services_destroy/${id}` , formData)
  }
}
