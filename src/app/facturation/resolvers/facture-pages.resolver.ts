import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { FactureService } from '../services/facture.service';
import { Facture } from '../models/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FacturePagesResolver implements Resolve<Facture> {
  constructor(private factureService:FactureService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Facture> {
    return this.factureService.getListFacture();
  }
}
