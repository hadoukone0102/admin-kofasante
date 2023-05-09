import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './admin/components/profile/profile.component';
import { LoginComponent } from './admin/components/login/login.component';
import { ForgotPasswordComponent } from './admin/components/forgot-password/forgot-password.component';
import { GLOBAL_RESOLVERS } from 'src/environments/environment';
import { ListAnonymousResolver } from './donation/resolvers/list-anonymous.resolver';
import { CountryCodeResolver } from './admin/resolvers/country-code.resolver';
import { AuthGuard } from './admin/guards/auth.guard';
import { ConfirmCodeSmsComponent } from './admin/components/confirm-code-sms/confirm-code-sms.component';
import { ResetPasswordComponent } from './admin/components/reset-password/reset-password.component';

const listProfileResolvers = {...GLOBAL_RESOLVERS};
// const listAnoResolvers = {...{listAnonymous: ListAnonymousResolver}, ...GLOBAL_RESOLVERS};

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./global/global.module').then(m => m.GlobalModule), canActivate: [AuthGuard]}, 
  {path: 'dons', loadChildren: () => import('./donation/donation.module').then(m => m.DonationModule), canActivate: [AuthGuard]}, 
  {path: 'profile', component: ProfileComponent, resolve: listProfileResolvers, canActivate: [AuthGuard]}, 
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]}, 
  {path: 'mot-de-passe-oublie', component: ForgotPasswordComponent}, 
  {path: 'login', component: LoginComponent, resolve: {countryCode: CountryCodeResolver}}, 
  {path: 'confirmer-code-sms', component: ConfirmCodeSmsComponent, resolve: {countryCode: CountryCodeResolver}}, 
  {path: 'reinitialiser-mot-de-passe', component: ResetPasswordComponent, resolve: {countryCode: CountryCodeResolver}}, 
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  {path:'**', redirectTo:'/page-introuvable'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
