import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassService } from '../services/mass.service';
import { MassTimeByIdModel } from '../models/mass-time.model';

@Injectable({
  providedIn: 'root'
})
export class MassTimeByIdResolver implements Resolve<MassTimeByIdModel> {
  constructor(private massService: MassService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassTimeByIdModel> {
    const id = route.paramMap.get('id');
    if(id){
      return this.massService.getMassTimeById(parseInt(id));
    }

    return this.massService.getMassTimeById(1);
  }
}
