import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataAdmin, DataAdminAdd, DataAdminResultAdd, DataAmdinErrorAdd, DataDeleteAdmin, ListAdmin, sendDatasForAddAdmin } from '../models/admin.model';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreService } from 'src/app/core/services/core.service';
import { DataProfileInfo, DataResultProfileInfo } from '../models/profile-info.model';
import { DataResultSetPassword, DataSetPassword } from '../models/set-password.model';
import { DataResultSetTypeAndContactAdmin, DataSetTypeAndContactAdmin } from '../models/set-type-admin.model';
import { DataDisabledAccount } from '../models/disabled-account-admin.model';
import { DataAdminByid } from '../models/admin-by-id.model';
import { DataEnabledAccount } from '../models/enabled-account-admin.model';
import { DataAdminType, typeAdmin } from '../models/admin-type.model';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) {}

  // ====================================================== //
  // =================== //ANCHOR - GET =================== //
  // ====================================================== //

  /**
   * Get the admin list from API
   * @date 5/17/2023 - 2:01:34 PM
   *
   * @returns {Observable<ListAdmin>}
   */
  getAdmins(): Observable<ListAdmin>{
    return this.http.get<ListAdmin>(`${environment.apiUrlAdminKofa}/admin-get`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Get the list of disabled accounts
   * @date 5/17/2023 - 2:03:13 PM
   *
   * @returns {Observable<DataDisabledAccount>}
   */
  getDisabledAccount(): Observable<DataDisabledAccount>{
    return this.http.get<DataDisabledAccount>(`${environment.apiUrlAdmin}/Admin/delete`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Get the list of administrator types
   * @date 5/17/2023 - 2:03:34 PM
   *
   * @returns {Observable<DataAdminType>}
   */
  getAdminTypes(): Observable<typeAdmin>{
    return this.http.get<typeAdmin>(`${environment.apiUrlAdminKofa}/type-get`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Get an administrator by id
   * @date 5/17/2023 - 2:05:51 PM
   *
   * @param {string} [id='']
   * @returns {Observable<DataAdminByid>}
   */
  getAdminById(id: string = ''): Observable<DataAdminByid>{
    return this.http.get<DataAdminByid>(`${environment.apiUrlAdmin}/administrateur/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  // ====================================================== //
  // =================== //ANCHOR - ADD =================== //
  // ====================================================== //

  /**
   * Add an administrator to the database
   * @date 5/17/2023 - 2:06:40 PM
   *
   * @param {DataAdminAdd} Admin
   * @returns {Observable<DataAdminResultAdd|DataAmdinErrorAdd>}
   */
  addAdmin(Admin: sendDatasForAddAdmin): Observable<DataAdminResultAdd|DataAmdinErrorAdd>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataAdminResultAdd|DataAmdinErrorAdd>(`${environment.apiUrlAdminKofa}/admin-register`, Admin, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }



  // ====================================================== //
  // ================== //ANCHOR - UPDATE ================= //
  // ====================================================== //

  /**
   * Update the first name and the last name of an administrator
   * @date 5/17/2023 - 2:07:34 PM
   *
   * @param {DataProfileInfo} Admin
   * @returns {Observable<DataResultProfileInfo>}
   */
  updateProfileInfo(Admin: DataProfileInfo): Observable<DataResultProfileInfo>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultProfileInfo>(`${environment.apiUrlAdmin}/changerInfo`, Admin, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Update the password of an administrator
   * @date 5/17/2023 - 2:09:50 PM
   *
   * @param {DataSetPassword} groupPasswords
   * @returns {Observable<DataResultSetPassword>}
   */
  updatePassword(groupPasswords: DataSetPassword): Observable<DataResultSetPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultSetPassword>(`${environment.apiUrlAdmin}/changerMdp`, groupPasswords, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Update the type and the phone number of an administrator
   * @date 5/17/2023 - 2:10:09 PM
   *
   * @param {DataSetTypeAndContactAdmin} typeAdmin
   * @returns {Observable<DataResultSetTypeAndContactAdmin>}
   */
  updateTypeAdmin(typeAdmin: DataSetTypeAndContactAdmin): Observable<DataResultSetTypeAndContactAdmin>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultSetTypeAndContactAdmin>(`${environment.apiUrlAdmin}/changeNumTypeAdmin`, typeAdmin, httpOptions).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  // ====================================================== //
  // ============= //ANCHOR - ACCOUNTS STATUT ============= //
  // ====================================================== //

  /**
   * Disabled an administrator account
   * @date 5/17/2023 - 2:11:15 PM
   *
   * @param {String} id
   * @returns {Observable<DataDeleteAdmin>}
   */
  disabledAdmin(id: String): Observable<DataDeleteAdmin>{
    return this.http.delete<DataDeleteAdmin>(`${environment.apiUrlAdmin}/supprimer/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
  }

  /**
   * Enabled an administrator account
   * @date 5/17/2023 - 2:12:20 PM
   *
   * @param {String} id
   * @returns {Observable<DataEnabledAccount>}
   */
  enabledAdmin(id: String): Observable<DataEnabledAccount>{
    return this.http.patch<DataEnabledAccount>(`${environment.apiUrlAdmin}/restoreAdmin/${id}`, null).pipe(
      catchError((error) => this.coreService.handleError(error)),
      );
  }

  // ====================================================== //
  // ============== //ANCHOR - ACCESS BY TYPE ============= //
  // ====================================================== //

  /**
   * Return true if the administrator logged is a priest
   * @date 5/17/2023 - 2:12:37 PM
   *
   * @returns {boolean}
   */
  isPriest(){
    const type = sessionStorage.getItem('type');
    if (type === 'Curé') {
      return true;
    }
    return false;
  }

  /**
   * Return true if the administrator logged is a secretary
   * @date 5/17/2023 - 2:13:13 PM
   *
   * @returns {boolean}
   */
  isSecretary(){
    const type = sessionStorage.getItem('type');
    if (type === 'Secrétaire') {
      return true;
    }
    return false;
  }

  /**
   * Return true if the administrator logged is a financier
   * @date 5/17/2023 - 2:13:25 PM
   *
   * @returns {boolean}
   */
  isFinancier(){
    const type = sessionStorage.getItem('type');
    if (type === 'Financier') {
      return true;
    }
    return false;
  }

  /**
   * Return true if the administrator logged is a president of parish council
   * @date 5/17/2023 - 2:13:35 PM
   *
   * @returns {boolean}
   */
  isPresidentParishCouncil(){
    const type = sessionStorage.getItem('type');
    if (type === 'Responsable de catéchèse') {
      return true;
    }
    return false;
  }

  /**
   * Return true if the administrator logged is a head of catechesis
   * @date 5/17/2023 - 2:14:41 PM
   *
   * @returns {boolean}
   */
  isHeadOfCatechesis(){
    const type = sessionStorage.getItem('type');
    if (type === 'Président du conseil paroissiale') {
      return true;
    }
    return false;
  }
}
