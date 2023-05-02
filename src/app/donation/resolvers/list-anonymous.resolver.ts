import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DataDon } from '../models/don.model';

@Injectable()
export class ListAnonymousResolver implements Resolve<DataDon> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataDon> {
    return this.donationService.getDonationsAnonymous();
  }
}
