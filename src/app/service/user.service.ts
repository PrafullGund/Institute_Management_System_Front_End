import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_END_POINTS } from '../constants/api-end-points-constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  setSelectedUser(user: any) {
    this.selectedUserSource.next(user);
  }

  clearSelectedUser() {
    this.selectedUserSource.next(null);
  }

  postUserRegistration(data: any): Observable<any> {
    return this.http.post(API_END_POINTS.user.postUserRegistration, data);
  }

  getAllUserRegister(page:number=1,limit:number=10): Observable<any> {
    return this.http.get(API_END_POINTS.user.getAllUserRegistration,{params:{page,limit}});
  }

  getByIdUserRegistration(id: number): Observable<any> {
    return this.http.get(`${API_END_POINTS.user.getByIdUserRegistration}/${id}`);
  }

  updateUserRegistration(id: any, data: any): Observable<any> {
    return this.http.put(`${API_END_POINTS.user.updateUserRegistration}/${id}`, data);
  }

  deleteUserRegistration(id: any): Observable<any> {
    return this.http.delete(`${API_END_POINTS.user.deleteUserRegistration}/${id}`)
  }

  searchUser(searchText: string,page:number=1,limit:number=10): Observable<any> {
    return this.http.get(API_END_POINTS.user.searchUsers, { params: { search: searchText,page,limit } });
  }

}
