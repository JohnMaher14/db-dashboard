import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getClientMessages():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}contacts_index`)

  }
  getFeedbacks():Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}feedbacks_index`)
  }
  getFeedbackDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}feedbacks_update_data/${id}`)
  }
  CreateFeedback(
    formData:any

  ):Observable<any>{
    // var formData = new FormData();
    // formData.append('en_name',en_name);
    // formData.append('ar_name',ar_name);
    // formData.append('en_role',en_role);
    // formData.append('ar_role',ar_role);
    // formData.append('en_feedback',en_feedback);
    // formData.append('ar_feedback',ar_feedback);
    // formData.append('status',status);

    // formData.append('image',image);
    return this._HttpClient.post(`${environment.apiUrl}feedbacks_store` , formData)
  }
  updateFeedback(
    id:number,
    formData:any


  ):Observable<any>{
    // var formData = new FormData();
    // formData.append('en_name',en_name);
    // formData.append('ar_name',ar_name);
    // formData.append('en_role',en_role);
    // formData.append('ar_role',ar_role);
    // formData.append('en_feedback',en_feedback);
    // formData.append('ar_feedback',ar_feedback);
    // formData.append('status',status);

    // formData.append('image',image);
    return this._HttpClient.post(`${environment.apiUrl}feedbacks_update/${id}` , formData)
  }
  deleteFeedback(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}feedbacks_destroy/${id}` , formData)
  }
}
