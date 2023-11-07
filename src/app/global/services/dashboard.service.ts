import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDonationInfo } from '../models/donationInfo.model';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAdminInfo } from '../models/admin-info.model';
import { MassRequestInfoModel } from '../models/mass-request-info.model';
import { MassReport } from 'src/app/mass/models/mass-report-model.model';

@Injectable()
export class DashboardService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) { }

  /**
   * Récupère tous les dons, anonymes et non anonymes
   * @returns {Observable<DataDonationInfo>} Observable qui renvoie un objet DonationInfo contenant tous les dons
   */
  getDonationInfo(): Observable<DataDonationInfo>{
    return this.http.get<DataDonationInfo>(`${environment.apiUrlDon}/dons/total`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
  getAdminInfo(): Observable<DataAdminInfo>{
    return this.http.get<DataAdminInfo>(`${environment.apiUrlAdmin}/total`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }

  getMassRequestInfo(): Observable<MassRequestInfoModel>{
    return this.http.get<MassRequestInfoModel>(`${environment.apiUrlMass}/requestmesse/total `).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  getAccumulationMassNOSearch(): Observable<MassReport>{
    return this.http.get<MassReport>(`${environment.MassReport}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
}
