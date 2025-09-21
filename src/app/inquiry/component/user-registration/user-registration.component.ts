import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from 'src/app/guards/unsaved-changes.guard';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements CanComponentDeactivate {
  userRegistrationForm!: FormGroup;
  submitted = false;
  userId: Number | null = null;
  isEditMode = false;
  private isSaved = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForm();

    this.userService.selectedUser$.subscribe(user => {
      if (user) {
        this.userId = user.userId || user.id;
        this.isEditMode = true;
        this.loadGetByIdUser(this.userId);
      } else {
        this.isEditMode = false;
      }
    })
  }

  canDeactivate(): Promise<boolean> {
    if (this.userRegistrationForm.dirty && !this.isSaved) {
      return Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Do you really want to leave this page?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, leave',
        cancelButtonText: 'Stay on this page'
      }).then((result) => {
        return result.isConfirmed;
      });
    }
    return Promise.resolve(true);
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

    const formValue = { ...this.userRegistrationForm.value };

    if (formValue.dob) {
      const date = new Date(formValue.dob);
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      formValue.dob = `${yyyy}-${mm}-${dd}`;
    }

    if (this.isEditMode && this.userId) {
      this.userService.updateUserRegistration(this.userId, formValue).subscribe({
        next: (res: any) => {
          this.isSaved = true;
          Swal.fire('Updated!', res.message, 'success').then(() => {
            this.router.navigate(['/inquiry/user']);
          });
        },
        error: (err) => {
          Swal.fire('Error', err.error?.message || 'Failed to update user', 'error');
        }
      });
    } else {
      this.userService.postUserRegistration(formValue).subscribe({
        next: (res: any) => {
          this.isSaved = true;
          Swal.fire('Success', res.message, 'success').then(() => {
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
    this.isSaved = true;
    this.userService.clearSelectedUser();
    this.router.navigate(['/inquiry/user']);
  }
}