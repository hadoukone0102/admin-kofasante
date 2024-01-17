import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Prix, RenseignerPage } from '../models/demande.model';
import { DemandeService } from '../services/demande.service';

@Injectable({
  providedIn: 'root'
})
export class PricePageResolver implements Resolve<Prix> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Prix> {
    return this.demandeService.getPricePage();
  }
}
