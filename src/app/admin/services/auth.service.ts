import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { DataCountry } from '../models/country-code.model';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService) { }

  login(contact: string, password: string, remember: boolean): Observable<boolean>{
    const isLoggedIn = (contact== 'pikachu' && password == 'pikachu')

    return of(isLoggedIn)
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
