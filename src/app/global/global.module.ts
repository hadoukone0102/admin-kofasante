import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardResolver } from './resolvers/dashboard.resolver';
import { DashboardService } from './services/dashboard.service';
import { AdminInfoResolver } from './resolvers/admin-info.resolver';
import { GLOBAL_RESOLVERS, environment } from 'src/environments/environment';
import { AuthGuard } from '../admin/guards/auth.guard';


const listDashboardResolvers = {...{
  dashboard: DashboardResolver,
  adminInfo: AdminInfoResolver,

  }, ...GLOBAL_RESOLVERS};

const globalRoutes: Routes = [
  {path: '', component: DashboardComponent, resolve: listDashboardResolvers,
    canActivate: [AuthGuard],
    data: {
      roles: environment.allRoles
    }
  },
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
    DashboardResolver,
  ]
})
export class GlobalModule { }
