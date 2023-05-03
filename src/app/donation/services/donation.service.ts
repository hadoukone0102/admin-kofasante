import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataDon, Don } from '../models/don.model';
import { CoreService } from 'src/app/core/core.service';

/**
 * Service permettant de récupérer les données de dons depuis l'API
 */
@Injectable()
export class DonationService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }
  /**
   * Récupère tous les dons, anonymes et non anonymes
   * @returns {Observable<DataDon>} Observable qui renvoie un objet DataDon contenant tous les dons
   */
  getDonations(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }

  /**
   * Récupère tous les dons anonymes
   * @returns {Observable<DataDon>} Observable qui renvoie un objet DataDon contenant tous les dons anonymes
   */
  //  SOIT JE RECUPERE LA DONNEE DE L'URL
  // SOIT JE CREE UNE VARIABLE ICI QUE J'INCREMENTE
  getDonationsAnonymous(page: string = '1'): Observable<DataDon>{
    console.log("Je passe dans le meta: " + page);
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes?page=${page}`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }

  /**
   * Récupère tous les dons non anonymes faits à titre personnel 
   * @returns {Observable<DataDon>} 
   */
  getDonationsNoAnonymousPerso(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso`).pipe(
      catchError((error: any) => {
        console.error('Per Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro perso');
      })
    );
  }

  /**
   * Récupère tous les dons non anonymes pour les organisations
   * @returns {Observable<DataDon>} Observable qui renvoie un objet DataDon contenant tous les dons non anonymes des organisations
   */
  getDonationsNoAnonymousOrga(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga`).pipe(
      catchError((error: any) => {
        console.error('Orga Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro orga');
      })
    );
  }

 
  /**
   * Renvoie la liste des dons anonymes dont le nom de l'expéditeur
   * contient les lettres fournies par la barre de recherche
   * @param {String} term
   * @returns {Observable<Don[]>}
   */
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

  /**
   * Renvoie la liste des dons non anonymes faits à titre personnel
   * dont le nom de l'expéditeur contient les lettres fournies
   * par la barre de recherche
   * @param {String} term
   * @returns {Observable<Don[]>}
   */
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

  /**
   * Renvoie la liste des dons non anonymes faits par des organisations
   * dont le nom de l'expéditeur ou de l'organisation contient 
   * les lettres fournies par la barre de recherche
   * @param {String} term
   * @returns {Observable<Don[]>}
   */
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
