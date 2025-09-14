import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent {
  userRegistrationForm!: FormGroup;
  submitted = false;
  userId: Number | null = null;
  isEditMode = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();
    
    this.userService.selectedUser$.subscribe(user=>{
      if(user){
        this.userId=user.userId || user.id;
        this.isEditMode=true;
        this.loadGetByIdUser(this.userId);
      }else{
        this.isEditMode=false;
      }
    })
  }

  private loadGetByIdUser(id: any) {
    this.userService.getByIdUserRegistration(id).subscribe({
      next: (res) => {
        const userData = { ...res.data };

        if (userData.dob) {
          const date = new Date(userData.dob);
          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, '0');
          const dd = String(date.getDate()).padStart(2, '0');
          userData.dob = `${yyyy}-${mm}-${dd}`;
        }

        this.userRegistrationForm.patchValue(userData);
      },
      error: (err) => console.error('Error loading user', err)
    });
  }

  private initForm(): void {
    this.userRegistrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      userTypeId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
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

  get f() {
    return this.userRegistrationForm.controls;
  }

  saveUser() {
    this.submitted = true;

    if (this.userRegistrationForm.invalid) {
      return;
    }

    if (this.isEditMode && this.userId) {
      this.userService.updateUserRegistration(this.userId, this.userRegistrationForm.value).subscribe({
        next: (res: any) => {
          Swal.fire('Updated!', res.message, 'success').then(() => {
            this.router.navigate(['/inquiry/user']);
          });
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Failed to update user', 'error');
        }
      })
    } else {
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
  }

  onCancel() {
    this.userRegistrationForm.reset();
    this.submitted = false;
    this.userService.clearSelectedUser();
    this.router.navigate(['/inquiry/user']);
  }
}