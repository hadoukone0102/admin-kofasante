import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChildMassRequest, MassRequest, anonymosMass } from '../mass-request-models/mass-request.model';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { MassReport } from '../ReportMass/models/mass-report-model.model';

@Injectable({
  providedIn: 'root'
})
export class MassRequestService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) {}
  /**
   * geting request mass no anonymous
   * @returns data of mass request
   */

  getMassRequests(): Observable<MassRequest>{
    const requestMassNoanonymous = environment.requestMassNoanonymous;
    return this.http.get<MassRequest>(requestMassNoanonymous).pipe(
      catchError((error) => this.coreService.handleError(error)),
      )
      }
      
    /**
     * delete...
     * @returns data for mess in ChildMassRequest
     */
  getMass():Observable<ChildMassRequest>{
    const requestMassNoanony = environment.requestMassNoanonymous;
    return this.http.get<ChildMassRequest>(requestMassNoanony).pipe(
      catchError((error)=>this.coreService.handleError(error)),
    )
  }

      /**
       * 
       * @returns data of request mass anonymous
       */
  getResquestMassAnonymous(): Observable<anonymosMass>{
    const requestMassIsanonymous = environment.requestMassIsanonymous;
    return this.http.get<anonymosMass>(requestMassIsanonymous).pipe(
      catchError((error)=>this.coreService.handleError(error)),
    )
  }

  /**
   * Rechercher des messes en fonction du nom ou du prénom
   * @param {string} searchValue - La valeur à rechercher (nom ou prénom)
   * @param {string} dateStart - Date de début de recherche
   * @param {string} dateEnd - Date de fin de recherche
   * @returns Les données des demandes de messe correspondantes
   */
  searchMassRequests(searchValue: string, dateStart: string, dateEnd: string): Observable<MassRequest> {
    // Vous devez adapter l'URL de recherche en fonction de votre API réelle
    const searchUrl = `${environment.requestMassNoanonymous}?search=${searchValue}&dateStart=${dateStart}&dateEnd=${dateEnd}`;
    
    return this.http.get<MassRequest>(searchUrl).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   /**
   * Rechercher des messes anonyme en fonction du type
   * @param {string} searchValue - La valeur à rechercher (nom ou prénom) =>type
   * @param {string} dateStart - Date de début de recherche
   * @param {string} dateEnd - Date de fin de recherche
   * @returns Les données des demandes de messe correspondantes
   */
   searchMassRequestsAnonymous(searchValue: string, dateStart: string, dateEnd: string): Observable<anonymosMass> {
    // Vous devez adapter l'URL de recherche en fonction de votre API réelle
    const searchUrl = `${environment.requestMassIsanonymous}?search=${searchValue}&dateStart=${dateStart}&dateEnd=${dateEnd}`;
    
    return this.http.get<anonymosMass>(searchUrl).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  // mes services de test

  /**
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassRequest>}
   */
  getMassAnonymousWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate):Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.massUrl}/requestmesse/isanonymous?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)))
  }

   /**
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassRequest>}
   */

  getMassNoAnonymousWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate):Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.massUrl}/requestmesse/Noanonymous?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)))
  }
  getAllMass(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.LinkForAllMassRequest}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)))
  }

  getAllMassGeneral(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.massReportForExport}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)))
  }

  /**
   * Get the cumulative price and donations number for a periode
   * @date 5/17/2023 - 9:12:20 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassReport>}
   */
  getAccumulationMass(search: string, dateStart: string, dateEnd: string): Observable<MassReport>{
    return this.http.get<MassReport>(`${environment.MassReport}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

   /**
   * @date 
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassRequest>}
   */
   getAllMassForExport(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.massUrl}/requestmesse/bigAll?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * basket
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassRequest>}
   */
  getBasketMassWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate):Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.BasketMass}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)))
  }


}
  
