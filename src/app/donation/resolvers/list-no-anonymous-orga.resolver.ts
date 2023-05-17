import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DataDon } from '../models/don.model';

@Injectable()
export class ListNoAnonymousOrgaResolver implements Resolve<DataDon> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataDon> {
    return this.donationService.getDonationsNoAnonymousOrga();
  }
}
