import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SignInService } from 'src/app/service/sign-in.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private signInService:SignInService,
    private  router: Router
  ){}

  logout(){
    this.signInService.postLogOut().subscribe({
      next:(res:any)=>{
         Swal.fire({
          icon: 'success',
          title: 'Logged out',
          text: res.message || 'You have been logged out successfully!',
          timer: 1500,
          showConfirmButton: false
        });
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }
    })
  }
}
