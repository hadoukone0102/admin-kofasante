import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DonationService } from '../services/donation.service';
import { LectureListe } from '../models/don.model';

@Injectable({
  providedIn: 'root'
})
export class ListAnalyseResolver implements Resolve<LectureListe> {
  constructor(
    private analyse:DonationService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<LectureListe> {
    return this.analyse.getListAnalysis();
  }
}
