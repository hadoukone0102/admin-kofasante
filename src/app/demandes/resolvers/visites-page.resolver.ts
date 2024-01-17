import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DemandeService } from '../services/demande.service';
import { Visites } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class VisitesPageResolver implements Resolve<Visites> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Visites> {
    return this.demandeService.getVisitePage();
  }
}
