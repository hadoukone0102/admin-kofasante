import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { Bilan, DataDonationInfo } from '../models/donationInfo.model';

@Injectable()
export class DashboardResolver implements Resolve<Bilan> {
  constructor(private dashboardService: DashboardService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Bilan> {
    return this.dashboardService.getDonationInfo();
  }
}
