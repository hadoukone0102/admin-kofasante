import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { AdminFormComponent } from './components/admin-form/admin-form.component';
import { FormsModule } from '@angular/forms';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminService } from './services/admin.service';
import { AdminsResolver } from './resolvers/admins.resolver';
import { AuthService } from './services/auth.service';

const adminRoutes: Routes = [
  {path: 'admin/liste', component: AdminListComponent}, 
  {path: 'admin/ajouter', component: AddAdminComponent}, 
];

@NgModule({
  declarations: [
    AdminListComponent,
    AddAdminComponent,
    AdminFormComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(adminRoutes)  

  ],
  providers:[
    AdminService,
    AdminsResolver,
    AuthService
  ]
})
export class AdminModule { }
