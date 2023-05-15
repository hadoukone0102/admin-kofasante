import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { DataAdminType } from '../models/admin-type.model';

@Injectable()
export class ListAdminTypesResolver implements Resolve<DataAdminType> {
  constructor(private adminService: AdminService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataAdminType> {
    return this.adminService.getAdminTypes();
  }
}
