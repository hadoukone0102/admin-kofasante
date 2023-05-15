import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, DataAdmin, DataAdminAdd, DataAdminResultAdd, DataAmdinErrorAdd, DataDeleteAdmin } from '../models/admin.model';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreService } from 'src/app/core/services/core.service';
import { DataProfileInfo, DataResultProfileInfo } from '../models/profile-info.model';
import { DataResultSetPassword, DataSetPassword } from '../models/set-password.model';
import { DataResultSetTypeAdmin, DataSetTypeAdmin } from '../models/set-type-admin.model';
import { DataDisabledAccount } from '../models/disabled-account-admin.model';
import { DataAdminByid } from '../models/admin-by-id.model';
import { DataEnabledAccount } from '../models/enabled-account-admin.model';
import { DataAdminType } from '../models/admin-type.model';

@Injectable()
export class AdminService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) {}

  getAdmins(): Observable<DataAdmin>{
    return this.http.get<DataAdmin>(`${environment.apiUrlAdmin}/afficher`).pipe(
      catchError((error: any) => {
        console.error('Nor Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }
  
  getDisabledAccount(): Observable<DataDisabledAccount>{
    return this.http.get<DataDisabledAccount>(`${environment.apiUrlAdmin}/Admin/delete`).pipe(
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }
  
  getAdminTypes(): Observable<DataAdminType>{
    return this.http.get<DataAdminType>(`${environment.apiUrlAdmin}/typesAdmin`).pipe(
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }

  searchAdmin(term: String): Observable<DataAdmin>{
    if(term.length === 1){
      return of();
    }
  
    return this.http.get<DataAdmin>(`${environment.apiUrlAdmin}/admin?search=${term}`).pipe(
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      map(dataDon => dataDon)
    );
  }

  getAdminById(id: string = ''): Observable<DataAdminByid>{
    return this.http.get<DataAdminByid>(`${environment.apiUrlAdmin}/administrateur/${id}`).pipe(
      tap(data => console.log("dans le tap: "+data.administrateur.contactAdmin)
      ),
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }

  addAdmin(Admin: DataAdminAdd): Observable<DataAdminResultAdd|DataAmdinErrorAdd>{
    console.log('dans add ok');
    
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<DataAdminResultAdd|DataAmdinErrorAdd>(`${environment.apiUrlAdmin}/register`, Admin, httpOptions).pipe(
      tap((response) => this.coreService.goToAdmin()),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données: '+ error);
      }),
      
    );
  }

  updateProfileInfo(Admin: DataProfileInfo): Observable<DataResultProfileInfo>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultProfileInfo>(`${environment.apiUrlAdmin}/changerInfo`, Admin, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.success )
      ),
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }
  
  updatePassword(groupPasswords: DataSetPassword): Observable<DataResultSetPassword>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultSetPassword>(`${environment.apiUrlAdmin}/changerMdp`, groupPasswords, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.success )
      ),
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }
  
  updateTypeAdmin(typeAdmin: DataSetTypeAdmin): Observable<DataResultSetTypeAdmin>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put<DataResultSetTypeAdmin>(`${environment.apiUrlAdmin}/typeAdmin/change`, typeAdmin, httpOptions).pipe(
      tap((response) => console.log("C'est dans la boite: "+response.success )
      ),
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la récupération des données: ', error);
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la récupération des données.');
      })
    );
  }

  disabledAdmin(id: String): Observable<DataDeleteAdmin>{
    console.log("dans le deletes");
    
    return this.http.delete<DataDeleteAdmin>(`${environment.apiUrlAdmin}/supprimer/${id}`).pipe(
      tap((response) => console.log("cest dans la boite")
      ),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la suppression des données: '+ error);
      }),)
  }
  
  enabledAdmin(id: String): Observable<DataEnabledAccount>{
    console.log("dans le deletes");
    
    return this.http.patch<DataEnabledAccount>(`${environment.apiUrlAdmin}/restoreAdmin/${id}`, null).pipe(
      tap((response) => console.log("cest dans la boite")
      ),
      catchError((error) => {
        this.coreService.goToPageError();
        return throwError('Une erreur est survenue lors de la suppression des données: '+ error);
      }),)
  }

  /*ACCES BY TYPE */
  isPriest(){
    const type = sessionStorage.getItem('type');
    if (type === 'Curé') {
      return true;  
    }
    return false;
  }

  isSecretary(){
    const type = sessionStorage.getItem('type');
    if (type === 'Secrétaire') {
      return true;  
    }
    return false;
  }

  isFinancier(){
    const type = sessionStorage.getItem('type');
    if (type === 'Financier') {
      return true;  
    }
    return false;
  }

  isPresidentParishCouncil(){
    const type = sessionStorage.getItem('type');
    if (type === 'Responsable de catéchèse') {
      return true;  
    }
    return false;
  }
  isHeadOfCatechesis(){
    const type = sessionStorage.getItem('type');
    if (type === 'Président du conseil paroissiale') {
      return true;  
    }
    return false;
  }
  /*END ACCES BY TYPE*/
}
