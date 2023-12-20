import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DataDon, KofaUser } from '../models/don.model';

@Injectable()
export class ListNoAnonymousOrgaResolver implements Resolve<KofaUser> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<KofaUser> {
    return this.donationService.getlistuserKofa();
  }
}
