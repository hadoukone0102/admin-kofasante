import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { FormsModule } from '@angular/forms';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminService } from './services/admin.service';
import { ListAdminsResolver } from './resolvers/list-admins.resolver';
import { AuthService } from './services/auth.service';
import { ModalSetInfoComponent } from './components/modal-set-info/modal-set-info.component';
import { ModalSetPasswordComponent } from './components/modal-set-password/modal-set-password.component';
import { GLOBAL_RESOLVERS } from 'src/environments/environment';
import { CountryCodeResolver } from './resolvers/country-code.resolver';
import { ConfirmCodeSmsComponent } from './components/confirm-code-sms/confirm-code-sms.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const listAdminResolvers = {...{listAdmins: ListAdminsResolver}, ...GLOBAL_RESOLVERS};
const listAddResolvers = {...{listAdmins: ListAdminsResolver,countryCode: CountryCodeResolver }, ...GLOBAL_RESOLVERS};

const adminRoutes: Routes = [
  {path: 'liste', component: AdminListComponent, resolve: listAdminResolvers}, 
  {path: 'ajouter', component: AddAdminComponent, resolve: listAddResolvers}, 
];

@NgModule({
  declarations: [
    AdminListComponent,
    AddAdminComponent,
    AdminFormComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    ModalSetInfoComponent,
    ModalSetPasswordComponent,
    ConfirmCodeSmsComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)  

  ],
  providers:[
    AdminService,
    ListAdminsResolver,
    CountryCodeResolver,
    AuthService
  ]
})
export class AdminModule { }
