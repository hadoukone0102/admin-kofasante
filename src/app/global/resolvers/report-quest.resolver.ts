import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { questReport } from 'src/app/mass/models/mass-report-model.model';

@Injectable({
  providedIn: 'root'
})
export class ReportQuestResolver implements Resolve<questReport> {
  constructor(
    private dashboardService : DashboardService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<questReport> {
    return this.dashboardService.getAccumulationQuestNOSearch();
  }
}
