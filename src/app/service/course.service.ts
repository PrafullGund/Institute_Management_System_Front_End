import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_END_POINTS } from '../constants/api-end-points-constants';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient:HttpClient) { }

  postAllCourse(data:any):Observable<any>{
    return this.httpClient.post(API_END_POINTS.course.postAllCourse,data);
  }
  
  getAllCourse(page:number=1,limit:number=10):Observable<any>{
    return this.httpClient.get(API_END_POINTS.course.getAllCourse,{params:{page,limit}});
  }
}