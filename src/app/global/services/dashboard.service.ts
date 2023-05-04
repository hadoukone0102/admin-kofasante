import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDonationInfo } from '../models/donationInfo.model';
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
  getDonationInfo(): Observable<DataDonationInfo>{
    return this.http.get<DataDonationInfo>(`${environment.apiUrlDon}/dons/total`).pipe(
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }
  getAdminInfo(): Observable<DataAdminInfo>{
    return this.http.get<DataAdminInfo>(`${environment.apiUrlAdmin}/total`).pipe(
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }
}
