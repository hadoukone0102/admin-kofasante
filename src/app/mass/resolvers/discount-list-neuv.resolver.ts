import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { discount } from '../models/mass.model';
import { MassService } from '../services/mass.service';

@Injectable({
  providedIn: 'root'
})
export class DiscountListNeuvResolver implements Resolve<discount> {
  constructor(private massService: MassService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<discount> {
    return this.massService.getDiscountListNeuv();
  }
  
}
