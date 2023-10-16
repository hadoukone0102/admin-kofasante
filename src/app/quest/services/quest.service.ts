import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { AddQuestTypeModel, AddQuestTypeResponseModel, DeleteQuestTypeResponseModel, QuestTypeByIdModel, QuestTypeModel, SetQuesTypeModel, SetQuesTypeResponseModel } from '../models/quest-type.model';
import { environment } from 'src/environments/environment';
import { Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService
    ) { }

    getQuestTypeList(): Observable<QuestTypeModel>{
      return this.http.get<QuestTypeModel>(`${environment.apiUrlMass}/QuesType/all`).pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }

    getQuestTypeById(id: number): Observable<QuestTypeByIdModel>{
      return this.http.put<QuestTypeByIdModel>(`${environment.apiUrlMass}/QuesType/show/${id}`,"").pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }

    addQuestType(data: AddQuestTypeModel): Observable<AddQuestTypeResponseModel>{
      return this.http.post<AddQuestTypeResponseModel>(`${environment.apiUrlMass}/QuesType/create`, data).pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }
    
    updateQuestType(data: SetQuesTypeModel): Observable<SetQuesTypeResponseModel>{
      return this.http.post<SetQuesTypeResponseModel>(`${environment.apiUrlMass}/QuesType/updata`, data).pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }

    deleteQuestType(id: number): Observable<DeleteQuestTypeResponseModel>{
      return this.http.delete<DeleteQuestTypeResponseModel>(`${environment.apiUrlMass}/QuesType/delete/${id}`).pipe(
        catchError((error) => this.coreService.handleError(error)),
      );
    }

}