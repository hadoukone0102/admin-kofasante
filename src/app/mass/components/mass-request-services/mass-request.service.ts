import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MassRequest, anonymosMass } from '../mass-request-models/mass-request.model';
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
   * geting request mass no anonymous
   * @returns data of mass request
   */

  getMassRequests(): Observable<MassRequest>{
    const requestMassNoanonymous = environment.requestMassNoanonymous;
    return this.http.get<MassRequest>(requestMassNoanonymous).pipe(
      catchError((error) => this.coreService.handleError(error)),
      )
      }

      /**
       * 
       * @returns data of request mass anonymous
       */
  getResquestMassAnonymous(): Observable<anonymosMass>{
    const requestMassIsanonymous = environment.requestMassIsanonymous;
    return this.http.get<anonymosMass>(requestMassIsanonymous).pipe(
      catchError((error)=>this.coreService.handleError(error)),
    )
  }

  }
  
