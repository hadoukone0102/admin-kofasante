import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from 'src/app/core/services/core.service';
import { Observable, catchError } from 'rxjs';
import { AbonnementPage, DocumentPage, Medecine, Prix, RenseignerPage, SendPrix, Success, Visites } from '../models/demande.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) { }

  getVisitePage(): Observable<Visites>{
    return this.http.get<Visites>(`${environment.apiUrlAdminKofa}/visite`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getVisitePagination(page : string = "1"): Observable<Visites>{
    return this.http.get<Visites>(`${environment.apiUrlAdminKofa}/visite?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getAbonnementPage(): Observable<AbonnementPage>{
    return this.http.get<AbonnementPage>(`${environment.apiUrlAdminKofa}/abonnement`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getAbonnementPagination(page: string ="1"): Observable<AbonnementPage>{
    return this.http.get<AbonnementPage>(`${environment.apiUrlAdminKofa}/abonnement?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getMedecinePage(): Observable<Medecine>{
    return this.http.get<Medecine>(`${environment.apiUrlAdminKofa}/medecine`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }


  getMedecinePagination(page: string = "1"): Observable<Medecine>{
    return this.http.get<Medecine>(`${environment.apiUrlAdminKofa}/medecine?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getDocumentsPage(): Observable<DocumentPage>{
    return this.http.get<DocumentPage>(`${environment.apiUrlAdminKofa}/document`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getDocumentsPagination(page: string = "1"): Observable<DocumentPage>{
    return this.http.get<DocumentPage>(`${environment.apiUrlAdminKofa}/document?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }


  getrenseignerPage(): Observable<RenseignerPage>{
    return this.http.get<RenseignerPage>(`${environment.apiUrlAdminKofa}/renseigner`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getrenseignerPagination(page : string ="1"): Observable<RenseignerPage>{
    return this.http.get<RenseignerPage>(`${environment.apiUrlAdminKofa}/renseigner?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getPricePage(): Observable<Prix>{
    return this.http.get<Prix>(`${environment.apiUrlAdminKofa}/services`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  UpdatePrice(id:number,data:SendPrix):Observable<Success>{
    return this.http.put<Success>(`${environment.apiUrlAdminKofa}/services/${id}`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

}
