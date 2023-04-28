import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataDon } from '../models/don.model';
import { DonationService } from '../services/donation.service';

@Injectable()
export class DonationNoAnonymousOrgaResolver implements Resolve<DataDon> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataDon> {
    return this.donationService.getDonationsNoAnonymousOrga();
  }
}
