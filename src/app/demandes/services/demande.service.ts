import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CoreService } from 'src/app/core/services/core.service';
import { Observable, catchError } from 'rxjs';
import { AbonnementPage, DocumentPage, Medecine, Prix, RapportsModels, RenseignerPage, SendPrix, Success, Visites } from '../models/demande.model';
import { environment } from 'src/environments/environment';
import { AbonnementFacture, MedecineFacture, RenseignerFacture, VisiteFacture, documentsFacture, update } from 'src/app/facturation/models/facture.model';
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

  getVisitePageUpdate(id:string,status:update): Observable<Visites>{
    return this.http.put<Visites>(`${environment.apiUrlAdminKofa}/visite/${id}`,status).pipe(
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

  getAbonnementPageUpdate(id:string,status:update): Observable<AbonnementPage>{
    return this.http.put<AbonnementPage>(`${environment.apiUrlAdminKofa}/abonnement/${id}`,status).pipe(
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

  getMedecinePageUpdate(id:string,status:update): Observable<Medecine>{
    return this.http.put<Medecine>(`${environment.apiUrlAdminKofa}/medecine/${id}`,status).pipe(
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

  getDocumentsPageUpdate(id:string,status:update): Observable<DocumentPage>{
    return this.http.put<DocumentPage>(`${environment.apiUrlAdminKofa}/document/${id}`,status).pipe(
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

  getrenseignerPageUpdate(id:string,status:update): Observable<RenseignerPage>{
    return this.http.put<RenseignerPage>(`${environment.apiUrlAdminKofa}/renseigner/${id}`,status).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getrenseignerPagination(page : string ="1"): Observable<RenseignerPage>{
    return this.http.get<RenseignerPage>(`${environment.apiUrlAdminKofa}/renseigner?page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getPricePage(): Observable<RapportsModels>{
    return this.http.get<RapportsModels>(`${environment.apiUrlAdminKofa}/Rapports`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  UpdatePrice(id:number,data:SendPrix):Observable<Success>{
    return this.http.put<Success>(`${environment.apiUrlAdminKofa}/services/${id}`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

  SendFacture(data:documentsFacture):Observable<Success>{
    return this.http.post<Success>(`${environment.apiUrlAdminKofa}/Facture`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

  SendAbonnement(data:AbonnementFacture):Observable<Success>{
    return this.http.post<Success>(`${environment.apiUrlAdminKofa}/Facture`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

  SendMedecine(data:MedecineFacture):Observable<Success>{
    return this.http.post<Success>(`${environment.apiUrlAdminKofa}/Facture`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

  SendVisites(data:VisiteFacture):Observable<Success>{
    return this.http.post<Success>(`${environment.apiUrlAdminKofa}/Facture`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }


  SendRenseigner(data:RenseignerFacture):Observable<Success>{
    return this.http.post<Success>(`${environment.apiUrlAdminKofa}/Facture`,data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }

}
