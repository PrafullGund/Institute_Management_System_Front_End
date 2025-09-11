import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINTS } from '../constants/api-end-points-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postUserRegistration(data: any): Observable<any> {
    return this.http.post(API_END_POINTS.user.postUserRegistration, data);
  }

  getAllUserRegister(): Observable<any> {
    return this.http.get(API_END_POINTS.user.getAllUserRegistration);
  }

  getByIdUserRegistration(id: number): Observable<any> {
    return this.http.get(`${API_END_POINTS.user.getByIdUserRegistration}/${id}`);
  }

  updateUserRegistration(id: any, data: any): Observable<any> {
    return this.http.put(`${API_END_POINTS.user.updateUserRegistration}/${id}`, data);
  }

  deleteUserRegistration(id:any):Observable<any>{
    return this.http.delete(`${API_END_POINTS.user.deleteUserRegistration}/${id}`)
  }
}
