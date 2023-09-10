import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { MassTimeModel } from '../models/mass-time.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MassService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }

  getTimesList(): Observable<MassTimeModel>{
    return this.http.get<MassTimeModel>(`${environment.apiUrlMass}/time/all`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
}
