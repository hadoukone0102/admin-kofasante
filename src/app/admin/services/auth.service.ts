import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { DataCountry } from '../models/country-code.model';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Datalogin } from '../models/login.model';
import { DataResultLogin } from '../models/result-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService) { }

  login(dataLogin: Datalogin): Observable<DataResultLogin>{
    return this.http.post<DataResultLogin>(`${environment.apiUrlAdmin}/login`, dataLogin).pipe(
      tap((response) => console.log("ma reponse: "+ response),
      ),
      catchError((error) => { 
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données: '+ error);
      }),)
    }

  logout(){
    
  }

  sendSMS(contact: string){
    
  }

  getCountryCode(): Observable<DataCountry>{
    return this.http.get<DataCountry>(`${environment.apiUrlDon}/pays`).pipe(
      catchError((error: any) => {
        console.error('Per Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données. Stay cool bro perso');
      })
    );
  }
}
