import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Prix, RapportsModels, RenseignerPage } from '../models/demande.model';
import { DemandeService } from '../services/demande.service';

@Injectable({
  providedIn: 'root'
})
export class PricePageResolver implements Resolve<RapportsModels> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RapportsModels> {
    return this.demandeService.getPricePage();
  }
}
