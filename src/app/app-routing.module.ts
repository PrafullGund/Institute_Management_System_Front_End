import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserAddComponent } from './inquiry/component/user-add/user-add.component';

const routes: Routes = [
  { path: '', component: LoginComponent },

  { path: 'login', component: LoginComponent },
  {path:'user-register',component:UserAddComponent},
  {
    path: 'inquiry', loadChildren: () => import('./inquiry/inquiry.module').then(m => m.InquiryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
