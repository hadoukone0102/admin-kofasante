import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DataDon, categorie } from '../models/don.model';

@Injectable()
export class ListAnonymousResolver implements Resolve<categorie> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<categorie> {
    return this.donationService.getAllCategorieTypes();
  }
}
