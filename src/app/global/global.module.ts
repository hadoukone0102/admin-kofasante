import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { Routes } from '@angular/router';
import { DashboardResolver } from './resolvers/dashboard.resolver';

const donationRoutes: Routes = [
  {path: '', component: DashboardComponent, resolve:{ dashboard: DashboardResolver}},
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  providers:[
    DashboardResolver
  ]
})
export class GlobalModule { }
