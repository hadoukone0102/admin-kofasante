import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataDon } from '../models/don.model';

@Injectable()
export class DonationService {

  constructor(private http: HttpClient) { }

  getDonations(): Observable<DataDon>{
    return this.http.get<DataDon>(`${environment.apiUrl}/dons`);
  }
}
