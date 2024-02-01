import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { Analysis, DataDon } from '../models/don.model';

@Injectable()
export class ListAllResolver implements Resolve<Analysis> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Analysis> {
    return this.donationService.getListDataForAnalysis();
  }
}
