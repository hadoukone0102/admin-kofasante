import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { AddMassTimeModel, AddMassTimeResponseModel, DeleteMassTimeModel, DeleteMassTimeResponseModel, MassTimeByIdModel, MassTimeModel, SetMassTimeModel, SetMassTimeResponseModel } from '../models/mass-time.model';
import { environment } from 'src/environments/environment';
import { AddMassModel, AddMassResponseModel, DataSetMassModel, DeleteMassDayModel, DeleteMassDayResponseModel, MassModel, SetMassModel, SetMassResponseModel } from '../models/mass.model';

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
   * Get the masses list
   * @date 9/10/2023 - 6:31:26 PM
   *
   * @returns {Observable<MassModel>}
   */
  getMassesList(page: string = '1', search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = ""): Observable<MassModel>{
    let requestUrl = `search=${search}&startDate=${dateStart}&page=${page}`
    if(dateEnd != ""){
      requestUrl = `search=${search}&startDate=${dateStart}&endDate=${dateEnd}&page=${page}`
    }
    return this.http.get<MassModel>(`${environment.apiUrlMass}/messes/all?${requestUrl}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  getMassesFullList(search: String ='', dateStart: string = environment.dateStartForSearch, dateEnd: string = ""): Observable<MassModel>{
    return this.http.get<MassModel>(`${environment.apiUrlMass}/messes/bigAll?search=${search}&startDate=${dateStart}&endDate=${dateEnd}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  getMassDayById(id: number): Observable<DataSetMassModel>{
    return this.http.get<DataSetMassModel>(`${environment.apiUrlMass}/messes-days/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  getMassTimeById(id: number): Observable<MassTimeByIdModel>{
    return this.http.get<MassTimeByIdModel>(`${environment.apiUrlMass}/times/show/${id}`).pipe(
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
  
  addMasses(data: AddMassModel): Observable<AddMassResponseModel>{
    return this.http.post<AddMassResponseModel>(`${environment.apiUrlMass}/messes/create`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  updateMassDay(data: SetMassModel): Observable<SetMassResponseModel>{
    return this.http.post<SetMassResponseModel>(`${environment.apiUrlMass}/messes/updata`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  updateMassTime(data: SetMassTimeModel): Observable<SetMassTimeResponseModel>{
    return this.http.put<SetMassTimeResponseModel>(`${environment.apiUrlMass}/time/update`, data).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  deleteMassDay(id: number): Observable<DeleteMassDayResponseModel>{
    return this.http.delete<DeleteMassDayResponseModel>(`${environment.apiUrlMass}/days/delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }
  
  deleteMass(id: number): Observable<DeleteMassDayResponseModel>{
    return this.http.delete<DeleteMassDayResponseModel>(`${environment.apiUrlMass}/messes/delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }

  deleteMassTime(id: number): Observable<DeleteMassTimeResponseModel>{
    return this.http.delete<DeleteMassTimeResponseModel>(`${environment.apiUrlMass}/times/delete/${id}`).pipe(
      catchError((error) => this.coreService.handleError(error)),
    );
  }


}
