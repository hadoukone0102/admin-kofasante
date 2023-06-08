import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';

/**
 * Return true if the user there is a contactReset in session storage
 * @date 6/8/2023 - 9:52:40 AM
 *
 * @export
 * @class IsResettingPasswordGuard
 * @typedef {IsResettingPasswordGuard}
 * @implements {CanActivate}
 */
@Injectable({
  providedIn: 'root'
})
export class IsResettingPasswordGuard implements CanActivate {
  constructor(
    private  coreService: CoreService
    ){}
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(sessionStorage.getItem('contactReset')){
        return true;
      }
      this.coreService.goToDashboard();
      return false;
      
  }
  
}
