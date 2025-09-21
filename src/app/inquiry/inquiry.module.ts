import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InquiryRoutingModule } from './inquiry-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { HomeComponent } from './component/home/home.component';
import { UserAddComponent } from './component/user-add/user-add.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { CoursesAddComponent } from './component/courses-add/courses-add.component';
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { AdmissionAddComponent } from './component/admission-add/admission-add.component';
import { AdmissionListComponent } from './component/admission-list/admission-list.component';
import { FeeAddComponent } from './component/fee-add/fee-add.component';
import { FeeListComponent } from './component/fee-list/fee-list.component';
import { ActivitiesFollowUpAddComponent } from './component/activities-follow-up-add/activities-follow-up-add.component';
import { ActivitiesFollowUpListComponent } from './component/activities-follow-up-list/activities-follow-up-list.component';
import { ReportsComponent } from './component/reports/reports.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    HomeComponent,
    UserAddComponent,
    UserListComponent,
    CoursesAddComponent,
    CoursesListComponent,
    AdmissionAddComponent,
    AdmissionListComponent,
    FeeAddComponent,
    FeeListComponent,
    ActivitiesFollowUpAddComponent,
    ActivitiesFollowUpListComponent,
    ReportsComponent,
    UserRegistrationComponent,
    HighlightPipe
  ],
  imports: [
    CommonModule,
    InquiryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCardModule,
    MatNativeDateModule,
    MatSortModule
  ]
})
export class InquiryModule { }
