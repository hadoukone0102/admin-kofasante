import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassService } from '../services/mass.service';
import { MassModel } from '../models/mass.model';

@Injectable({
  providedIn: 'root'
})
export class MassListResolver implements Resolve<MassModel> {
  constructor(private massService: MassService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassModel> {
    return this.massService.getMassesList();
  }
}
