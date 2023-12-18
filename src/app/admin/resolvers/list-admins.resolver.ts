import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { DataAdmin, ListAdmin } from '../models/admin.model';

@Injectable()
export class ListAdminsResolver implements Resolve<ListAdmin> {
  constructor(private adminService: AdminService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListAdmin> {
    return this.adminService.getAdmins();
  }
}
