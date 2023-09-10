import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { AddMassTimeModel, AddMassTimeResponseModel, MassTimeModel } from '../models/mass-time.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MassService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }

  /**
   * Get the masses times list
   * @date 9/10/2023 - 4:50:58 PM
   *
   * @returns {Observable<MassTimeModel>}
   */
  getMassesTimesList(): Observable<MassTimeModel>{
    return this.http.get<MassTimeModel>(`${environment.apiUrlMass}/time/all`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  /**
   * Add a mass time to the database
   * @date 9/10/2023 - 4:50:44 PM
   *
   * @param {AddMassTimeModel} data
   * @returns {Observable<AddMassTimeResponseModel>}
   */
  addMassTime(data: AddMassTimeModel): Observable<AddMassTimeResponseModel>{
    return this.http.post<AddMassTimeResponseModel>(`${environment.apiUrlMass}/time/create`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }


}
