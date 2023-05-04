import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { DataAdminInfo } from '../models/admin-info.model';

@Injectable({
  providedIn: 'root'
})
export class AdminInfoResolver implements Resolve<DataAdminInfo> {
  constructor(private dashboardService: DashboardService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataAdminInfo> {
    return this.dashboardService.getAdminInfo();
  }
}
