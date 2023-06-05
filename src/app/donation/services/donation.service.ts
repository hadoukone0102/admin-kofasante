import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataDon } from '../models/don.model';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAccumulation } from '../models/accumulation.model';

/**
 * Service to get donation data from API
 */
@Injectable()
export class DonationService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }

  // ====================================================== //
  // =================== //ANCHOR - GET =================== //
  // ====================================================== //

  /**
   * Get the cumulative price and donations number for a periode
   * @date 5/17/2023 - 9:12:20 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataAccumulation>}
   */
  getAccumulationDonations(search: string, dateStart: string, dateEnd: string): Observable<DataAccumulation>{
    return this.http.get<DataAccumulation>(`${environment.apiUrlDon}/dons/cumul-prix?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  // ====================================================== //
  // ================ //ANCHOR - GET WHERE ================ //
  // ====================================================== //

    /**
     * Get the donation list matching  the filter criteria. 
     * It uses pagination system (25 lines per page)
     * @date 5/17/2023 - 8:27:41 AM
     *
     * @param {string} [page='1']
     * @param {string} search
     * @param {string} dateStart
     * @param {string} dateEnd
     * @returns {Observable<DataDon>}
     */
    getDonationsWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<DataDon>{
      return this.http.get<DataDon>(`${environment.apiUrlDon}/dons?search=${search}&startDate=${dateStart}&endDate=${dateEnd}&page=${page}`).pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }
    
  /**
   * Get the list of anonymous donations matching  the filter criteria
   * It uses pagination system (25 lines per page)
   * @date 5/17/2023 - 8:48:20 AM
   *
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
  getDonationsAnonymousWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  /**
   * Get the list of non-anonymous donation made on a personal basis matching
   * the filter criteria.
   * It uses pagination system (25 lines per page)
   * @date 5/17/2023 - 8:55:48 AM
   *
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
  getDonationsNoAnonymousPersoWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  /**
   * Get the list of non-anonymous donation made by organizations matching the filter criteria
   * It uses pagination system (25 lines per page)
   * @date 5/17/2023 - 9:10:55 AM
   *
   * @param {string} [page='1']
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
  getDonationsNoAnonymousOrgaWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
  
  /**
   * Get list of failed donation transactions
   * It uses pagination system (25 lines per page)
   * @date 5/24/2023 - 9:37:26 AM
   *
   * @param {string} [page='1']
   * @param {String} [search='']
   * @param {string} [dateStart=environment.dateStartForSearch]
   * @param {string} [dateEnd=environment.todayDate]
   * @returns {Observable<DataDon>}
   */
  getDonationsFailedWhere(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = environment.todayDate): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/failed?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}&page=${page}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  // ====================================================== //
  // ============== // ANCHOR - GET ALL WHERE ============= //
  // ====================================================== //

   /**
   * Get the full list of anonymous donations mathching the filter criteria
   * @date 5/17/2023 - 8:50:31 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
   getAllDonationsWhere(search: string, dateStart: string, dateEnd: string): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons-all?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
   /**
   * Get the full list of anonymous donations mathching the filter criteria
   * @date 5/17/2023 - 8:50:31 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
   getAllDonationsAnonymousWhere(search: string, dateStart: string, dateEnd: string): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes-all?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   /**
   * Get the full list of non-anonymous donations made on a personal basis 
   * matching the filter criteria
   * @date 5/17/2023 - 9:04:19 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
   getAllDonationsNoAnonymousPersoWhere(search: string, dateStart: string, dateEnd: string): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso-all?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   /**
   * Get the full list of non-anonymous donation made by organizations matching the filter criteria
   * @date 5/17/2023 - 9:11:45 AM
   *
   * @param {string} search
   * @param {string} dateStart
   * @param {string} dateEnd
   * @returns {Observable<DataDon>}
   */
   getAllDonationsNoAnonymousOrgaWhere(search: string, dateStart: string, dateEnd: string): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga-all?search=${search}&&startDate=${dateStart}&&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
}
