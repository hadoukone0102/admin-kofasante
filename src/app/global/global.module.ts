import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { DashboardService } from './services/dashboard.service';

const globalRoutes: Routes = [
  {path: '', component: DashboardComponent, resolve: {dashboard: DashboardResolver}},
];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(globalRoutes)
  ],
  providers:[
    DashboardService,
    DashboardResolver
  ]
})
export class GlobalModule { }
