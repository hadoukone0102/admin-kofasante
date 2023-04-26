import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PartialsModule } from '../partials/partials.module';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { FormsModule } from '@angular/forms';

const adminRoutes: Routes = [
  {path: 'admin/liste', component: AdminListComponent}, 
  {path: 'admin/ajouter', component: AddAdminComponent}, 
];

@NgModule({
  declarations: [
    AdminListComponent,
    AddAdminComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PartialsModule,
    RouterModule.forChild(adminRoutes)  

  ]
})
export class AdminModule { }
