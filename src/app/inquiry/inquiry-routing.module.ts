import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { CoursesListComponent } from './component/courses-list/courses-list.component';
import { AdmissionListComponent } from './component/admission-list/admission-list.component';
import { FeeListComponent } from './component/fee-list/fee-list.component';
import { ActivitiesFollowUpListComponent } from './component/activities-follow-up-list/activities-follow-up-list.component';
import { ReportsComponent } from './component/reports/reports.component';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'user', component: UserListComponent },
      { path: 'user-registration/:id', component: UserRegistrationComponent },
      { path: 'course', component: CoursesListComponent },
      { path: 'admission', component: AdmissionListComponent },
      { path: 'fee', component: FeeListComponent },
      { path: 'follow-up', component: ActivitiesFollowUpListComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  { path: 'dashboard', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InquiryRoutingModule { }
