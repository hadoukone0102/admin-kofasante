import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassService } from '../services/mass.service';
import { DataSetMassModel } from '../models/mass.model';

@Injectable({
  providedIn: 'root'
})
export class MassDayById implements Resolve<DataSetMassModel> {
  constructor(private massService: MassService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataSetMassModel> {
    const id = route.paramMap.get('id');
    if(id){
      return this.massService.getMassDayById(parseInt(id));
    }
    return this.massService.getMassDayById(1);
  }
}
