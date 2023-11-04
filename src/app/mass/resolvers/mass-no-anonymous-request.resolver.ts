import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MassRequestService } from '../services/mass-request.service';
import { MassRequest } from '../models/mass-request.model';

@Injectable({
  providedIn: 'root'
})
export class MassNoAnonymousRequestResolver implements Resolve<MassRequest> {
  constructor(
    private massRequestService: MassRequestService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MassRequest> {
    return this.massRequestService.getMassRequests();
  }
}
