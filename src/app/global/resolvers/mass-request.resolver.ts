import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { MassRequestInfoModel } from '../models/mass-request-info.model';

@Injectable({
  providedIn: 'root'
})
export class MassRequestResolver implements Resolve<MassRequestInfoModel> {
  constructor(private dashboardService: DashboardService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassRequestInfoModel> {
    return this.dashboardService.getMassRequestInfo();
  }
}
