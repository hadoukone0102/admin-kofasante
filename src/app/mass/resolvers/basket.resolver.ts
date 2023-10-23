import { Injectable } from '@angular/core';
import { MassService} from '../services/mass.service'
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Basket } from '../models/basket.model';

@Injectable({
  providedIn: 'root'
})
export class BasketResolver implements Resolve<Basket> {
  constructor(
    private MassService: MassService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Basket> {
    return this.MassService.getBasketlistMass();
  }
}
