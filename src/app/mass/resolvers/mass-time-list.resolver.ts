import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassService } from '../services/mass.service';
import { MassTimeModel } from '../models/mass-time.model';

@Injectable({
  providedIn: 'root'
})
export class MassTimeListResolver implements Resolve<MassTimeModel> {
  constructor(private massService: MassService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassTimeModel> {
    return this.massService.getMassesTimesList();
  }
}
