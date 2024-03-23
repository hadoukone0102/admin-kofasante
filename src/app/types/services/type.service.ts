import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { AjouterType, result } from '../Models/types';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService) { }


    AjouterUnType(body:AjouterType): Observable<result>{
      return this.http.post<result>(`${environment.apiUrlAdminKofa}/Types/service`,body).pipe(
        catchError((error) => this.coreService.handleError(error))
      );
    }

    AfficherListeMed(): Observable<result>{
      return this.http.get<result>(`${environment.apiUrlAdminKofa}/Types/medecine`).pipe(
        catchError((error) => this.coreService.handleError(error))
      );
    }

    AfficherListeDoc(): Observable<result>{
      return this.http.get<result>(`${environment.apiUrlAdminKofa}/Types/document`).pipe(
        catchError((error) => this.coreService.handleError(error))
      );
    }

    SupprimerTypeMed(id:number): Observable<result>{
      return this.http.delete<result>(`${environment.apiUrlAdminKofa}/Types/med/${id}`).pipe(
        catchError((error) => this.coreService.handleError(error))
      );
    }

    SupprimerTypeDoc(id:number): Observable<result>{
      return this.http.delete<result>(`${environment.apiUrlAdminKofa}/Types/doc/${id}`).pipe(
        catchError((error) => this.coreService.handleError(error))
      );
    }


}
