import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DataDon, ListeMedia } from '../models/don.model';

@Injectable()
export class ListNoAnonymousPersoResolver implements Resolve<ListeMedia> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListeMedia> {
    return this.donationService.getlistKofaMedia();
  }
}
