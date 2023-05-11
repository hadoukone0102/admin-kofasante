import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class FinancierGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private  coreService: CoreService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let test =  this.adminService.isFinancier();
      if(test){
        return true;
      }
    this.coreService.goToPageNotFound();
    return false;
  }
  
}
