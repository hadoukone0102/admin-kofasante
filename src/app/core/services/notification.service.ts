import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { environment } from 'src/environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { DataDonationNotif } from '../models/donation-notif.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) {}

  getNoSeenDonations(): Observable<DataDonationNotif>{
    return this.http.get<DataDonationNotif>(`${environment.apiUrlDon}/dons/unseen/total`).pipe(
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }
}
