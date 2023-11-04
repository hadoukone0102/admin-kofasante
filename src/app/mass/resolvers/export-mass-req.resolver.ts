import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassReportServicesService } from '../services/mass-report-services.service';
import { ExportMass } from '../models/mass-report-model.model';

@Injectable({
  providedIn: 'root'
})
export class ExportMassReqResolver implements Resolve<ExportMass> {
  constructor(
    private massrservices: MassReportServicesService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ExportMass> {
    return this.massrservices.GetMassExport();
  }
}
