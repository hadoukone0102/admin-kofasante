import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { DataCountry } from '../models/country-code.model';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Datalogin } from '../models/login.model';
import { AdminLog, DataResultLogin, Datalogins } from '../models/result-login.model';
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

  /**
   * Log in a administrator
   * @date 5/17/2023 - 4:23:49 PM
   *
   * @param {Datalogin} dataLogin
   * @returns {Observable<DataResultLogin>}
   */
  login(dataLogin: Datalogins): Observable<AdminLog>{
    return this.http.post<AdminLog>(`${environment.apiUrlAdminKofa}/admin-login`, dataLogin).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
    }

    getToken(): string|null {
      return sessionStorage.getItem('token');
    }

    getTypeOfAdminLogged(): string|null {
      return sessionStorage.getItem('type');
    }

    getContactOfAdminLogged(): string|null {
      return sessionStorage.getItem('contact');
    }

    /**
     * Return true if the administrator is authenticated
     * @date 5/17/2023 - 4:25:09 PM
     *
     * @returns {boolean}
     */
    isLogged(){
      const token = sessionStorage.getItem('token');
      return !! token; // !! transform the result to boolean
    }

    /**
     * Logout the administrator
     * @date 5/17/2023 - 4:25:39 PM
     */
    logout(){
      sessionStorage.clear();
      this.coreService.goToLogin();
    }

  /**
   * Send SMS to the administrator by his phone number
   * @date 5/17/2023 - 4:25:53 PM
   *
   * @param {DataForgotPassword} contact
   * @returns {Observable<DataResultForgotPassword>}
   */
  sendSMS(contact: DataForgotPassword): Observable<DataResultForgotPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultForgotPassword>(`${environment.apiUrlAdmin}/SMS`, contact, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Send confirmation code thar administrator has received by sms to the database
   * and gets the confirmation
   * @date 5/17/2023 - 4:26:44 PM
   *
   * @param {DataConfirmCode} smsCode
   * @returns {Observable<DataResultConfirmCode>}
   */
  sendConfirmationCode(smsCode: DataConfirmCode): Observable<DataResultConfirmCode> {
    return this.http.post<DataResultConfirmCode>(`${environment.apiUrlAdmin}/verification`, smsCode).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Reset administrator password
   * @date 5/17/2023 - 4:28:43 PM
   *
   * @param {DataResetPassword} newPassword
   * @returns {Observable<DataResultResetPassword>}
   */
  resetPassword(newPassword: DataResetPassword): Observable<DataResultResetPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataResultResetPassword>(`${environment.apiUrlAdmin}/renitialisation`, newPassword, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Get country code
   * @date 5/17/2023 - 4:29:18 PM
   *
   * @returns {Observable<DataCountry>}
   */
  getCountryCode(): Observable<DataCountry>{
    return this.http.get<DataCountry>(`${environment.apiUrlDon}/pays`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

}
