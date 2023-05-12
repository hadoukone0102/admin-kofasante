import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { DataAdminByid } from '../models/admin-by-id.model';

@Injectable({
  providedIn: 'root'
})
export class AdminByIdResolver implements Resolve<DataAdminByid> {
  constructor(private adminService: AdminService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataAdminByid> {
    const id = route.paramMap.get('id');
    if(id){
      return this.adminService.getAdminById(id);
    }else{
      return this.adminService.getAdminById('');
    }
  }
}
