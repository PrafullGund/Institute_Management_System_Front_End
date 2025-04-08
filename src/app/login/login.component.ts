import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../service/sign-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm!:FormGroup;
  
  constructor(private signInService:SignInService, private router:Router){}

  ngOnInit(){
    this.setForm();
  }

  setForm(){
    this.signInForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required])
    })
  }

  submitForm() {
    if (this.signInForm.valid) {
      this.signInService.postSign(this.signInForm.value).subscribe({
        next: (response: any) => {
  
          if (response && response.success) { 
            localStorage.setItem("firstName", response.firstName);
            localStorage.setItem("lastName", response.lastName);
            localStorage.setItem("email", response.email);
            localStorage.setItem("token", response.token);
  
            this.router.navigate(['inquiry']).then(() => {
              alert(response.message || "Login Successfully");
            });
          } else {
            alert("Invalid response from server");
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          alert("Login failed. Please try again.");
        }
      });
    } else {
      alert("Email and Password are required");
    }
  }
  
}
