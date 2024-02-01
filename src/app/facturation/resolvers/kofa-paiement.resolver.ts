import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FactureService } from '../services/facture.service';
import { Paiements } from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class KofaPaiementResolver implements Resolve<Paiements> {
  constructor(
    private demandeService: FactureService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paiements> {
    return this.demandeService.getListFacturePaiement();
  }
}
