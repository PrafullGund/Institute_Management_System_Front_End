import { Component } from '@angular/core';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  userList!:User[];
  datasource:any;
  displayColumns:string[]=["Sr.No","Name","Mobile","Email"]

  filterChange(data:Event){
    const value=(data.target as HTMLInputElement).value;
    this.datasource.filter
  }

  addUser(){

  }
}
