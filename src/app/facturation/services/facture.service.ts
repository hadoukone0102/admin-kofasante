import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { environment } from 'src/environments/environment';
import { Facture } from '../models/facture.model';
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

}
