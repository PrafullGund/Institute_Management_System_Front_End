import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_END_POINTS } from '../constants/api-end-points-constants';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private http:HttpClient) { }

  postSign(data:any):Observable<any>{
    return this.http.post(API_END_POINTS.signIn.postSignIn,data);
  }

  postLogOut():Observable<any>{
    const token =localStorage.getItem('token');
    const headers=new HttpHeaders().set('Authorization',`Bearer ${token}`);
    return this.http.post(API_END_POINTS.logout.postLogOut,{},{headers});
  }
}
