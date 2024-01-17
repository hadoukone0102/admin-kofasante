import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DemandeService } from '../services/demande.service';
import { AbonnementPage } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class AbonnementPageResolver implements Resolve<AbonnementPage> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AbonnementPage> {
    return this.demandeService.getAbonnementPage();
  }
}
