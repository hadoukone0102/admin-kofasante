import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { anonymosMass } from '../components/mass-request-models/mass-request.model';
import { MassRequestService } from '../components/mass-request-services/mass-request.service';

@Injectable({
  providedIn: 'root'
})
export class MassAnonymousRequestResolver implements Resolve<anonymosMass> {
  constructor(
    private massRequestService: MassRequestService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<anonymosMass> {
    return this.massRequestService.getResquestMassAnonymous();
  }
}
