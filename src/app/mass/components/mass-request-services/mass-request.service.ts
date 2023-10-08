import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MassRequest } from '../mass-request-models/mass-request.model';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';

@Injectable({
  providedIn: 'root'
})
export class MassRequestService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
  ) {}
  /**
   * 
   * @returns data of mass request
   */
  // getMassRequests(){
  //   const requestMassNoanonymous = environment.requestMassNoanonymous;
  //   return this.http.get<MassRequest[]>(requestMassNoanonymous);
  // }

  // getMassesList(): Observable<MassModel>{
  //   return this.http.get<MassModel>(`${environment.apiUrlMass}/messes/all`).pipe(
  //     catchError((error) => this.coreService.handleError(error)),
  //   );
  // }

  getMassRequests(): Observable<MassRequest>{
    const requestMassNoanonymous = environment.requestMassNoanonymous;
    return this.http.get<MassRequest>(requestMassNoanonymous).pipe(
      catchError((error) => this.coreService.handleError(error)),
      )
      }
  }
  
