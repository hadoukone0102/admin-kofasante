import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DemandeService } from '../services/demande.service';
import { Medecine } from '../models/demande.model';

@Injectable({
  providedIn: 'root'
})
export class MedecinePageResolver implements Resolve<Medecine> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Medecine> {
    return this.demandeService.getMedecinePage();
  }
}
