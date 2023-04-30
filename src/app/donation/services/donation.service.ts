import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataDon, Don } from '../models/don.model';
import { CoreService } from 'src/app/core/core.service';

@Injectable()
export class DonationService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }

  getDonations(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }
  getDonationsAnonymous(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }

  getDonationsNoAnonymousPerso(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso`).pipe(
      catchError((error: any) => {
        console.error('Per Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro perso');
      })
    );
  }

  getDonationsNoAnonymousOrga(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga`).pipe(
      catchError((error: any) => {
        console.error('Orga Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro orga');
      })
    );
  }

 
  searchDonationListAno(term: String): Observable<Don[]>{
    if(term.length < 2){
      return of([]);
    }
  
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes/?noma=${term}`).pipe(
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données');
      }),
      map(dataDon => dataDon.dons)
    );
  }
  searchDonationListNoAnoPerso(term: String): Observable<Don[]>{
    if(term.length < 2){
      return of([]);
    }
  
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso/?noma=${term}`).pipe(
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données');
      }),
      map(dataDon => dataDon.dons)
    );
  }
  searchDonationListNoAnoOrga(term: String): Observable<Don[]>{
    if(term.length < 2){
      return of([]);
    }
  
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga/?noma=${term}`).pipe(
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données');
      }),
      map(dataDon => dataDon.dons)
    );
  }
  
}
