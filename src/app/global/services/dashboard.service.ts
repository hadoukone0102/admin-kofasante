import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bilan, DataDonationInfo } from '../models/donationInfo.model';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAdminInfo } from '../models/admin-info.model';

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
  getDonationInfo(): Observable<Bilan>{
    return this.http.get<Bilan>(`${environment.apiUrlAdminKofa}/media-liste/bilan`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
  getAdminInfo(): Observable<DataAdminInfo>{
    return this.http.get<DataAdminInfo>(`${environment.apiUrlAdmin}/total`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }


}
