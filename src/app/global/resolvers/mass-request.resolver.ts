import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { MassRequestInfoModel } from '../models/mass-request-info.model';
import { MassReport } from 'src/app/mass/models/mass-report-model.model';

@Injectable({
  providedIn: 'root'
})
export class MassRequestResolver implements Resolve<MassReport> {
  constructor(private dashboardService: DashboardService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassReport> {
    return this.dashboardService.getAccumulationMassNOSearch();
  }
}
