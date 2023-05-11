import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { DataCountry } from '../models/country-code.model';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Datalogin } from '../models/login.model';
import { DataResultLogin } from '../models/result-login.model';
import { DataResultForgotPassword } from '../models/result-forgot-password.model';
import { DataForgotPassword } from '../models/forgot-password.model';
import { DataConfirmCode, DataResultConfirmCode } from '../models/confirm-code.model';
import { DataResetPassword, DataResultResetPassword } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService) { }

  login(dataLogin: Datalogin): Observable<DataResultLogin>{
    return this.http.post<DataResultLogin>(`${environment.apiUrlAdmin}/login`, dataLogin).pipe(
      tap((response) => console.log("ma reponse: "+ response.auth)
      ),
      catchError((error) => { 
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données: '+ error);
      }),)
    }

    isLogged(){
      const token = sessionStorage.getItem('token');
      return !! token; // !! transform the result to boolean
    }

    logout(){
      sessionStorage.clear();
      this.coreService.goToLogin();
    }

  sendSMS(contact: DataForgotPassword): Observable<DataResultForgotPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultForgotPassword>(`${environment.apiUrlAdmin}/SMS`, contact, httpOptions).pipe(
      tap((response) => console.log("send confirm")
      ),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('sendsms Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      
    );
  }

  sendConfirmationCode(smsCode: DataConfirmCode): Observable<DataResultConfirmCode> {
    return this.http.post<DataResultConfirmCode>(`${environment.apiUrlAdmin}/verification`, smsCode).pipe(
      tap((response) => console.log("c ok")
      ),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('sendconfirm Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      
    );
  }

  resetPassword(newPassword: DataResetPassword): Observable<DataResultResetPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultResetPassword>(`${environment.apiUrlAdmin}/renitialisation`, newPassword, httpOptions).pipe(
      tap((response) => console.log("password reset")
      ),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('resetpass Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      
    );
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
