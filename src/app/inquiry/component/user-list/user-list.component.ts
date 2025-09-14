import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: any[] = [];
  searchTerm = new Subject<string>();
  currentPage = 1;
  limit = 10;
  totalUsers = 0;
  Math = Math;
  lastSearchText = '';

  ngOnInit() {
    this.loadUsers();
    this.onSearchUser();
  }

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  changePage(page: number) {
    this.currentPage = page;

    if (this.lastSearchText) {
      this.userService.searchUser(this.lastSearchText).subscribe(res => {
        this.users = res.data;
        this.totalUsers = res.total || res.data.length;
        this.currentPage = res.page || page;
      });
    } else {
      this.loadUsers(page);
    }
  }

  loadUsers(page: number = 1) {
    this.userService.getAllUserRegister(page, this.limit).subscribe({
      next: (res) => {
        this.users = res.users;
        this.totalUsers = res.total;
        this.currentPage = res.page;
      },
      error: (err) => console.error('Error fetching users', err)
    });
  }

  onAddUser() {
    this.router.navigate(['/inquiry/user-registration']);
  }

  onDeleteUser(user: any) {
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
            this.loadUsers();
          },
          error: (err: any) => {
            Swal.fire('Error', err.error?.message || 'Failed to delete user', 'error');
          }
        });
      }
    });
  }

  onEditUser(user: any) {
    this.userService.setSelectedUser(user);
    this.router.navigate(['/inquiry/user-registration']);
  }

onSearchInputChange(event: any) {
  this.lastSearchText = event.target.value.trim();
  this.searchTerm.next(this.lastSearchText);
}


  onSearchUser() {
    this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      if (searchText) {
        this.userService.searchUser(searchText, this.currentPage, this.limit).subscribe({
          next: (res) => {
            this.users = res.users;
            this.totalUsers = res.total;
            this.currentPage = res.page;
          },
          error: (err) => {
            if (err.status === 404) {
              this.users = [];
              this.totalUsers = 0;
              Swal.fire({
                icon: 'info',
                title: 'No Users Found',
                text: `No users found matching "${searchText}"`,
                timer: 4000,
                showConfirmButton: false
              });
            } else {
              Swal.fire('Error', err.error?.message || 'Failed to fetch users', 'error');
            }
          }
        });
      } else {
        this.loadUsers(this.currentPage);
      }
    });
  }

}