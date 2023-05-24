import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { DataDonationNotif } from '../models/donation-notif.model';
import { DataSetViewDonation } from '../models/set-view-donation.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  test!: any;
  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) {}

  getNoSeenDonations(): Observable<DataDonationNotif>{
    return this.http.get<DataDonationNotif>(`${environment.apiUrlDon}/dons/unseen/total`).pipe(
      catchError((error) => this.coreService.handleError(error))
    );
  }
  
  updateDonationsAnoSeen(): Observable<DataSetViewDonation>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataSetViewDonation>(`${environment.apiUrlDon}/dons/anonymes/seen/edit`, null, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.status_message )
      ),
      catchError((error) => this.coreService.handleError(error))
    );
  }
  updateDonationsNoAnoPersoSeen(): Observable<DataSetViewDonation>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataSetViewDonation>(`${environment.apiUrlDon}/dons/non-anonymes/perso/seen/edit`, null, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.status_message )
      ),
      catchError((error) => this.coreService.handleError(error))
    );
  }
  updateDonationsNoAnoOrgaSeen(): Observable<DataSetViewDonation>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataSetViewDonation>(`${environment.apiUrlDon}/dons/non-anonymes/orga/seen/edit`, null, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.status_message )
      ),
      catchError((error) => this.coreService.handleError(error))
    );
  }
}
