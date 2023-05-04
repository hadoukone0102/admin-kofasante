import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from 'src/app/admin/services/admin.service';
import { DataDonationNotif } from '../models/donation-notif.model';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DonationNotifResolver implements Resolve<DataDonationNotif> {
  constructor(private notifService: NotificationService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataDonationNotif> {
    return this.notifService.getNoSeenDonations();
  }
}
