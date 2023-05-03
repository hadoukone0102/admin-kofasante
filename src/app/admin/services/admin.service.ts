import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, DataAdmin } from '../models/admin.model';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoreService } from 'src/app/core/core.service';

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
        return throwError('Une erreur est survenue lors de la récupération des données. Bouyacacha');
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

  getAdmin(id: number): Observable<DataAdmin>{
    return this.http.get<DataAdmin>(`${environment.apiUrlAdmin}/${id}`);
  }

  addAdmin(Admin: Admin): Observable<Admin>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.post<Admin>(`${environment.apiUrlAdmin}/Admins`, Admin, httpOptions);
  }

  // updateAdmin(Admin: Admin): Observable<Admin>{
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-type': 'application/json' })
  //   };
  //   return this.http.put('api/Admins', Admin, httpOptions);
  // }

  // deleteAdmin(id: Number): Observable<DataAdmin>{
  //   return this.http.delete(`${environment.apiUrlAdmin}/${id}`);
  // }

  
}
