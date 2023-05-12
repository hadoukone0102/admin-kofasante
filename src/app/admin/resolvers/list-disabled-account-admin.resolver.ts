import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { DataDisabledAccount } from '../models/disabled-account-admin.model';

@Injectable()
export class ListDisabledCountAdminResolver implements Resolve<DataDisabledAccount> {
  constructor(private adminService: AdminService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataDisabledAccount> {
    return this.adminService.getDisabledAccount();
  }
}
