import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { TypeService } from '../services/type.service';
import { result } from '../Models/types';

@Injectable({
  providedIn: 'root'
})
export class ListeTypeMedResolver implements Resolve<result> {
  constructor(private typeService : TypeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<result> {
    return this.typeService.AfficherListeMed();
  }
}
