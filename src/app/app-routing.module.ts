import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent}, 
  {path: 'profile', component: ProfileComponent}, 
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path:'', redirectTo:'dashboard', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
