import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataDon } from '../models/don.model';
import { PartialsService } from 'src/app/partials/partials.service';

@Injectable()
export class DonationService {

  constructor(
    private http: HttpClient,
    private partialsService: PartialsService
    ) { }

  getDonations(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/anonymes`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.partialsService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
      })
    );
  }

  getDonationsNoAnonymousPerso(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/perso`).pipe(
      catchError((error: any) => {
        console.error('Per Une erreur est survenue lors de la récupération des données: ', error);
        this.partialsService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro perso');
      })
    );
  }

  getDonationsNoAnonymousOrga(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrlDon}/dons/non-anonymes/orga`).pipe(
      catchError((error: any) => {
        console.error('Orga Une erreur est survenue lors de la récupération des données: ', error);
        this.partialsService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro orga');
      })
    );
  }
}
