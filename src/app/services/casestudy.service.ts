import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CasestudyService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCaseStudy(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}case_study_index`)
  }
  getCaseStudyDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}caseStudysingledata/${id}`)
  }
  createCaseStudy(
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,
    banner_image: File,

  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    formData.append('banner_image',banner_image);
    return this._HttpClient.post(`${environment.apiUrl}case_study_store` , formData)
  }
  updateCaseStudy(
    id:number,
    en_title: any,
    ar_title: any,
    en_text: any,
    ar_text: any,
    image: File,
    banner_image: File,



  ):Observable<any>{
    var formData = new FormData();
    formData.append('en_title',en_title);
    formData.append('ar_title',ar_title);
    formData.append('en_text',en_text);
    formData.append('ar_text',ar_text);
    formData.append('image',image);

    formData.append('banner_image',banner_image);
    return this._HttpClient.post(`${environment.apiUrl}case_study_update/${id}` , formData)
  }
  deleteClient(id:number , formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}case_study_destroy/${id}` , formData)
  }
}
