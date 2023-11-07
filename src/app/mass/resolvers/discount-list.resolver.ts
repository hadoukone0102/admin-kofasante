import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassService } from '../services/mass.service';
import { discount } from '../models/mass.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountListResolver implements Resolve<discount> {
  constructor(private massService: MassService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<discount> {
    return this.massService.getDiscountList();
  }
  
}
