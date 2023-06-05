import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DonationTypeModel } from '../models/donation-type.model';

@Injectable({
  providedIn: 'root'
})
export class ListDonationTypeResolver implements Resolve<DonationTypeModel> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DonationTypeModel> {
    return this.donationService.getListDonationType();
  }
}
