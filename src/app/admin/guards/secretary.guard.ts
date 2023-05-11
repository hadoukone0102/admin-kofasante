import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { AdminService } from '../services/admin.service';

@Injectable({
  providedIn: 'root'
})
export class SecretaryGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private  coreService: CoreService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      let test =  this.adminService.isSecretary();
      if(test){
        return true;
      }

    this.coreService.goToPageNotFound();
    return false;
  }
  
}
