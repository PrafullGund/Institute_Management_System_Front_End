import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent {
  userRegistrationForm!: FormGroup;
  submitted = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  saveUser() {
    this.submitted = true;

    if (this.userRegistrationForm.invalid) {
      return;
    }

    this.userService.postUserRegistration(this.userRegistrationForm.value).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: 'Success',
          text: res.message,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/inquiry/user']);
        });
        this.userRegistrationForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        Swal.fire('Error', err.error?.message || 'Failed to register user', 'error');
      }
    });
  }

  onCancel() {
    this.userRegistrationForm.reset();
    this.submitted = false;
    this.userService.clearSelectedUser();
    this.router.navigate(['/login']);
  }

  get f() {
    return this.userRegistrationForm.controls;
  }

  private initForm(): void {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      userTypeId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          )
        ]
      ],
      addressLineOne: ['', [Validators.required]],
      addressLineTwo: [''],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      postalCode: ['', [Validators.required]],
      educationTitle: ['', [Validators.required]],
      description: ['', [Validators.required]],
      passingYear: ['', [Validators.required]]
    });
  }
}
