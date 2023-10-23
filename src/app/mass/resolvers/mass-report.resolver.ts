import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AllMassRequest } from '../models/mass-report-model.model';
import { MassReportServicesService } from '../services/mass-report-services.service';

@Injectable({
  providedIn: 'root'
})
export class MassReportResolver implements Resolve<AllMassRequest> {
  constructor(
    private massrservices: MassReportServicesService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AllMassRequest> {
    return this.massrservices.getAllMassRequest();
  }
}
