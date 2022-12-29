import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getClients(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}clients_index`)
  }
  getClientsFeedbackForm(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}client_review_index`)
  }
  filterClientsFeedbackForm(
    date:any
  ): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}client_review_index?date=${date}`)
  }
  updateClientPhoto(
    id:number,
    client_name: any,
    client_position: any,
    most_positives: any,
    points_considered: any,
    start_count: any,
    client_image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('client_name',client_name);
    formData.append('client_position',client_position);
    formData.append('most_positives',most_positives);
    formData.append('points_considered',points_considered);
    formData.append('start_count',start_count);

    formData.append('client_image',client_image);
    return this._HttpClient.post(`${environment.apiUrl}client_review_update/${id}` , formData)
  }
  getClientFormDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}client_review_update_data/${id}`)
  }
  getClientDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}clients_update_data/${id}`)
  }
  CreateClient(
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    type: any,
    logo: File,
    priority_number: any,
    social_media_status: any,
    mobile_app_status: any,
    web_dev_status: any
  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('type',type);
    formData.append('priority_number',priority_number);
    formData.append('social_media_status',social_media_status);
    formData.append('mobile_app_status',mobile_app_status);
    formData.append('web_dev_status',web_dev_status);

    formData.append('logo',logo);
    return this._HttpClient.post(`${environment.apiUrl}clients_store` , formData)
  }
  updateClient(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    type: any,
    logo: File,
    priority_number: any,
    social_media_status: any,
    mobile_app_status: any,
    web_dev_status: any

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('type',type);

    formData.append('logo',logo);
    formData.append('priority_number',priority_number);
    formData.append('social_media_status',social_media_status);
    formData.append('mobile_app_status',mobile_app_status);
    formData.append('web_dev_status',web_dev_status);
    return this._HttpClient.post(`${environment.apiUrl}clients_update/${id}` , formData)
  }
  updateClientNull(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    type: any,
    priority_number: any,

    social_media_status: any,
    mobile_app_status: any,
    web_dev_status: any

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('type',type);
    formData.append('priority_number',priority_number);

    formData.append('social_media_status',social_media_status);
    formData.append('mobile_app_status',mobile_app_status);
    formData.append('web_dev_status',web_dev_status);
    return this._HttpClient.post(`${environment.apiUrl}clients_update/${id}` , formData)
  }
  deleteClient(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}clients_destroy/${id}` , formData)
  }
}
