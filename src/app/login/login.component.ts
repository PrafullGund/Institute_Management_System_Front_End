import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignInService } from '../service/sign-in.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  signInForm!: FormGroup;

  constructor(private signInService: SignInService, private router: Router) { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
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
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: response.message || "Login Successfully",
                confirmButtonColor: '#3085d6'
              });
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid response from server',
              confirmButtonColor: '#d33'
            });
          }
        },
        error: (err) => {
          console.error("API Error:", err);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please try again.',
            confirmButtonColor: '#d33'
          });
        }
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Email and Password are required',
        confirmButtonColor: '#f6c23e'
      });
    }
  }
}
