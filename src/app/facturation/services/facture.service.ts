import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { environment } from 'src/environments/environment';
import { Facture, Paiements } from '../models/facture.model';
import { Medecine } from 'src/app/demandes/models/demande.model';
@Injectable({
  providedIn: 'root'
})
export class FactureService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) { }

  getListFacture(): Observable<Facture>{
    return this.http.get<Facture>(`${environment.apiUrlAdminKofa}/Facture/liste`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getListFacturePaginate(page: string ="1"): Observable<Facture>{
    return this.http.get<Facture>(`${environment.apiUrlAdminKofa}/Facture/liste?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getListFacturePaiement(): Observable<Paiements>{
    return this.http.get<Paiements>(`${environment.apiUrlAdminKofa}/paiement`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getFactureDelete(id:string | number): Observable<Medecine>{
    return this.http.delete<Medecine>(`${environment.apiUrlAdminKofa}/Facture/delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

}
