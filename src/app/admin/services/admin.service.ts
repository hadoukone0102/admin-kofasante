import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin, DataAdmin } from '../models/admin.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<DataAdmin>{
    return this.http.get<DataAdmin>(`${environment.apiUrlAdmin}/admins`);
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

  updateAdmin(Admin: Admin): Observable<Admin>{
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-type': 'application/json' })
    };
    return this.http.put('api/Admins', Admin, httpOptions);
  }

  deleteAdmin(id: Number): Observable<DataAdmin>{
    return this.http.delete(`${environment.apiUrlAdmin}/${id}`);
  }
}
