import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DataCountry } from '../models/country-code.model';

@Injectable()
export class CountryCodeResolver implements Resolve<DataCountry> {
  constructor(private authService: AuthService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataCountry> {
    return this.authService.getCountryCode();
  }
}
