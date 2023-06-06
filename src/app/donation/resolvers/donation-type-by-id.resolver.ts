import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { DonationTypeByIdModel } from '../models/donation-type.model';

@Injectable({
  providedIn: 'root'
})
export class DonationTypeByIdResolver implements Resolve<DonationTypeByIdModel> {
  constructor(private donationService: DonationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DonationTypeByIdModel> {
    const id = route.paramMap.get('id');
    if(id){
      return this.donationService.getDonationTypeById(id);
    }else{
      return this.donationService.getDonationTypeById();
    }
  }
}
