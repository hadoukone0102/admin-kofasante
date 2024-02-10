import { Data } from './../../facturation/models/facture.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AnaUser, Analysis, DataDon, KofaUser, Lecture, LectureListe, ListeMedia, MediaSend, Rappel, Rapport, Successmessage, categorie, rappelSucces, success } from '../models/don.model';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAccumulation } from '../models/accumulation.model';
import { ActionDonationTypeResponseModel, AddDontationTypeModel, AddDontationTypeResponseModel, DonationTypeByIdModel, DonationTypeData, DonationTypeModel, SetDonationTypeResponseModel } from '../models/donation-type.model';

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


  getAllCategorieTypes(): Observable<categorie>{
    return this.http.get<categorie>(`${environment.apiUrlAdminKofa}/categorie/get`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getlistKofaMedia(): Observable<ListeMedia>{
    return this.http.get<ListeMedia>(`${environment.apiUrlAdminKofa}/media-liste`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getlistuserKofa(): Observable<KofaUser>{
    return this.http.get<KofaUser>(`${environment.apiUrlAdminKofa}/all-user`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getDeleteUser(id:string|number): Observable<KofaUser>{
    return this.http.delete<KofaUser>(`${environment.apiUrlAdminKofa}/delete-user/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  SendRappelForKofaUser(data:Rappel): Observable<rappelSucces>{
    return this.http.post<rappelSucces>(`${environment.apiUrlAdminKofa}/rappels`,data).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }



  getListDataForAnalysis(): Observable<Analysis>{
    return this.http.get<Analysis>(`${environment.apiUrlAdminKofa}/analyse`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }


  sendRapports(data:Rapport): Observable<success>{
    return this.http.post<success>(`${environment.apiUrlAdminKofa}/Rapports`,data).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  sendLecture(data:Lecture): Observable<success>{
    return this.http.post<success>(`${environment.apiUrlAdminKofa}/lecture`,data).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getListAnalysis(): Observable<LectureListe>{
    return this.http.get<LectureListe>(`${environment.apiUrlAdminKofa}/lecture`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getListDataForAnalysisUpdate(id:string,Data:AnaUser): Observable<Analysis>{
    return this.http.put<Analysis>(`${environment.apiUrlAdminKofa}/lecture/${id}`,Data).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getListDataForAnalysisDelete(id:string|number): Observable<Analysis>{
    return this.http.delete<Analysis>(`${environment.apiUrlAdminKofa}/lecture/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  DeleteMedias(id:string | number): Observable<LectureListe>{
    return this.http.delete<LectureListe>(`${environment.apiUrlAdminKofa}/media-delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

   // ====================================================== //
  // =================== //ANCHOR - ADD =================== //
  // ====================================================== //

  addPublication(data: MediaSend): Observable<Successmessage>{
    return this.http.post<Successmessage>(`${environment.apiUrlAdminKofa}/media`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }


  // ====================================================== //
  // ================== //ANCHOR - UPDATE ================= //
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

  /**
   * Get the list of donation types
   * @date 6/5/2023 - 5:18:11 PM
   *
   * @returns {Observable<DonationTypeModel>}
   */
  getListDonationType(): Observable<DonationTypeModel>{
    return this.http.get<DonationTypeModel>(`${environment.apiUrlDon}/dons/types`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getListDisabledDonationType(): Observable<DonationTypeModel>{
    return this.http.get<DonationTypeModel>(`${environment.apiUrlDon}/dons/types/soft-deleted`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getDonationTypeById(id: string = ''): Observable<DonationTypeByIdModel>{
    return this.http.get<DonationTypeByIdModel>(`${environment.apiUrlDon}/dons/types/${id}`).pipe(
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

  // ====================================================== //
  // =================== //ANCHOR - ADD =================== //
  // ====================================================== //

  addDonationType(data: AddDontationTypeModel): Observable<AddDontationTypeResponseModel>{
    return this.http.post<AddDontationTypeResponseModel>(`${environment.apiUrlDon}/dons/types/create`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  // ====================================================== //
  // ================== //ANCHOR - UPDATE ================= //
  // ====================================================== //

  updateDonationType(data: AddDontationTypeModel, id:number): Observable<SetDonationTypeResponseModel>{
    return this.http.put<SetDonationTypeResponseModel>(`${environment.apiUrlDon}/dons/types/edit/${id}`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  enableDonationType(id: String): Observable<ActionDonationTypeResponseModel>{
    return this.http.put<ActionDonationTypeResponseModel>(`${environment.apiUrlDon}/dons/types/restore/${id}`, null).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
  }

  disableDonationType(id: String): Observable<ActionDonationTypeResponseModel>{
    return this.http.delete<ActionDonationTypeResponseModel>(`${environment.apiUrlDon}/dons/types/soft-delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
  }

  deleteDonationType(id: String): Observable<ActionDonationTypeResponseModel>{
    return this.http.delete<ActionDonationTypeResponseModel>(`${environment.apiUrlDon}/dons/types/delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
  }
}
