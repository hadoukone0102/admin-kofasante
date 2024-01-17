import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DemandeService } from '../services/demande.service';
import { RenseignerPage } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class RenseignerPageResolver implements Resolve<RenseignerPage> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RenseignerPage> {
    return this.demandeService.getrenseignerPage();
  }
}
