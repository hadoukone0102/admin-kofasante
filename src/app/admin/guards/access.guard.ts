import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private adminService: AdminService,
    private  coreService: CoreService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      // let test =  this.adminService.isSecretary();
      // if(test){
      //   return true;
      // }

    const type = sessionStorage.getItem('type');
    const roles = route.data['roles'];
    console.log("type: "+ type);
    console.log("roles: "+ roles);
    

    if (roles.includes(type)) {
      return true;
    }

    this.coreService.goToLockedPage();
    return false;
  }
  
}
