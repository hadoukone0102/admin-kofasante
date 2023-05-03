import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { DataAdmin } from '../models/admin.model';

@Injectable()
export class ListAdminsResolver implements Resolve<DataAdmin> {
  constructor(private adminService: AdminService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataAdmin> {
    return this.adminService.getAdmins();
  }
}
