import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CareersService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  // categories
  getCareers():Observable<any>  {
    return this._HttpClient.get(`${environment.apiUrl}jobCategory_index`)
  }
  getCareerDetails(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}jobCategory_update_data/${id}`)
  }
  createCareer(
    data: any
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}jobCategory_store`, data)
  }
  updateCareer(
    id:number,
    data: any
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}jobCategory_update/${id}`, data)
  }

  disableCareer(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}jobCategory_destroy/${id}`, id)
  }
  deleteCareer(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}deleteCategory/${id}`, id)
  }
  recoverCareer(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}jobCategory_recover/${id}`, id)
  }
  // jobs
  getJobs(
    id:number
  ):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}job_index?id=${id}`)
  }
  getJobDetails(id:number):Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}job_update_data/${id}`)
  }
  createJob(
    data: any
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}job_store`, data)
  }
  updateJob(
    id:number,
    data: any
  ):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}job_update/${id}`, data)
  }

  disableJob(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}job_destroy/${id}`, id)
  }
  deleteJob(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}deleteJob/${id}`, id)
  }
  recoverJob(id:number):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}job_recover/${id}`, id)
  }
}
