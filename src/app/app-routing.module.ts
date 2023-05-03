import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { LoginComponent } from './admin/components/login/login.component';
import { ForgotPasswordComponent } from './admin/components/forgot-password/forgot-password.component';

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./global/global.module').then(m => m.GlobalModule)}, 
  {path: 'dons', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule)}, 
  {path: 'profile', component: ProfileComponent}, 
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent}, 
  {path: 'login', component: LoginComponent}, 
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'**', redirectTo:'/page-introuvable'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
