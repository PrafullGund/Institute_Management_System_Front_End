import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.loadAllUser();
  }

  addUser() {
    this.router.navigate(['/inquiry/user-registration']);
  }

  loadAllUser() {
    this.userService.getAllUserRegister().subscribe({
      next: (res) => {
        this.users = res.data;
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }

  editUser(user: any) {
    const userId = user.userId || user.id;
    this.router.navigate(['/inquiry/user-registration', userId]);
  }

  deleteUser(user: any) {
    const userId = user.userId || user.id;
    if (!userId) {
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserRegistration(userId).subscribe({
          next: (res: any) => {
            Swal.fire('Deleted!', res.message, 'success');
            this.loadAllUser();
          },
          error: (err: any) => {
            Swal.fire('Error', err.error?.message || 'Failed to delete user', 'error');
          }
        });
      }
    });
  }
}
