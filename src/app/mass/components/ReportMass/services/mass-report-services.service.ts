import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { environment } from 'src/environments/environment';
import { MassReport, AllMassRequest, ExportMass } from '../../ReportMass/models/mass-report-model.model'
import { MassRequest, anonymosMass } from '../../mass-request-models/mass-request.model';
import { Basket } from 'src/app/mass/models/basket.model';
@Injectable({
  providedIn: 'root'
})
export class MassReportServicesService {

  constructor(
    private http:HttpClient,
    private coreService: CoreService,
  ) { }
  /**
   * 
   * @returns data for mass report
   */
  GetMassReport():Observable<MassReport>{
    const MassReport = environment.MassReport;
    return this.http.get<MassReport>(MassReport).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }
  /**
   * 
   * @returns data for mass request
   */

  GetMassExport():Observable<ExportMass>{
    const exportMass = environment.massReportForExport;
    return this.http.get<ExportMass>(exportMass).pipe(
      catchError((error)=>this.coreService.handleError(error)),
    )
  }
  /**
   * @date 13/10/2023
   * @returns 
   */

  getAllMassRequest():Observable<AllMassRequest>{
    const AllMassRequestVariable = environment.LinkForAllMassRequest;
    return this.http.get<AllMassRequest>(AllMassRequestVariable).pipe(
      catchError((error) => this.coreService.handleError(error)),
    )
  }
  // Ajoutez cette méthode pour récupérer les données en fonction de la page
  getMassDataForPage(page: number): Observable<AllMassRequest> {
    const basketUrl = environment.LinkForAllMassRequest; // Remplacez par votre URL
    const params = new HttpParams().set('page', page.toString()); // Paramètre pour la page
    return this.http.get<AllMassRequest>(basketUrl, { params }).pipe(
      catchError(error => this.coreService.handleError(error))
    );
  }
   /**
   * Rechercher des messes en fonction du nom ou du prénom
   * @param {string} searchValue - La valeur à rechercher (nom ou prénom)
   * @param {string} dateStart - Date de début de recherche
   * @param {string} dateEnd - Date de fin de recherche
   * @returns Les données des demandes de messe correspondantes
   *  this.isAnonymous, this.isOrganisation, this.isAll
   */
   searchBasketMass(searchValue: string, dateStart: string, dateEnd: string): Observable<AllMassRequest> {
    // Vous devez adapter l'URL de recherche en fonction de votre API réelle
    const searchUrl = `${environment.LinkForAllMassRequest}?search=${searchValue}&dateStart=${dateStart}&dateEnd=${dateEnd}`;
    
    return this.http.get<AllMassRequest>(searchUrl).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  searchElementOfMass(searchValue: string, dateStart: string, dateEnd: string, isAnonymous: string, isOrganisation:string, isAll:string): Observable<AllMassRequest> {
    // Vous devez adapter l'URL de recherche en fonction de votre API réelle
    const searchUrl = `${environment.LinkForAllMassRequest}?search=${searchValue}&dateStart=${dateStart}&dateEnd=${dateEnd}&dateEnd=${isAnonymous}&dateEnd=${isOrganisation}&dateEnd=${isAll}`;
    
    return this.http.get<AllMassRequest>(searchUrl).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }


  /**
   * @date 14/10/23 22:01
   * 
   */
  getMassAnonymousWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<anonymosMass>{
    return this.http.get<anonymosMass>(`${environment.requestMassIsanonymous}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   /**
   * @date 14/10/23 22:20
   * 
   */
  getMassNoAnonymousWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<MassRequest>{
    return this.http.get<MassRequest>(`${environment.requestMassNoanonymous}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   /**
   * @date 14/10/2023 - 22:28
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<MassReport>}
   */
   getAccumulationMass(search: string, dateStart: string, dateEnd: string): Observable<MassReport>{
    return this.http.get<MassReport>(`${environment.BasketMass}?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
     
     * @date 14/10/2023 - 22:48
     *
     * @param {string} [page='1']
     * @param {string} search
     * @param {string} dateStart
     * @param {string} dateEnd
     * @returns {Observable<AllMassRequest>}
     */
  getAllMassWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<AllMassRequest>{
    return this.http.get<AllMassRequest>(`${environment.LinkForAllMassRequest}?search=${search}&startDate=${dateStart}&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

}
