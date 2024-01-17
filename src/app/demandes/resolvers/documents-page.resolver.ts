import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DocumentPage } from '../models/demande.model';
import { DemandeService } from '../services/demande.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentsPageResolver implements Resolve<DocumentPage> {
  constructor(
    private demandeService: DemandeService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentPage> {
    return this.demandeService.getDocumentsPage();
  }
}
