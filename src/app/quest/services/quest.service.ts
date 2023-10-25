import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { AddQuestTypeModel, AddQuestTypeResponseModel, DeleteQuestTypeResponseModel, QuestOriginal, QuestTypeByIdModel, QuestTypeModel, Quette, SetQuesTypeModel, SetQuesTypeResponseModel } from '../models/quest-type.model';
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


    //ajouter par kone

    /**
     * @date 19/10/23 16:26
     * @returns data for quest
     */
    getQuestListWhere():Observable<Quette>{
      return this.http.get<Quette>(`${environment.apiUrlQuete}/Quest/all`).pipe(
        catchError((error)=>this.coreService.handleError(error)),
      )
    }

      //~~~~~~~~~~~~~~~~~~~~~~~~~for original link ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~é
      /**
       * @date 25/10/23 10:25
       * @returns @observable
       */
      getQuestWithMass():Observable<QuestOriginal>{
        return this.http.get<QuestOriginal>(`${environment.apiUrlQuestWithMass}`).pipe(
          catchError((error)=>this.coreService.handleError(error)),
        )
      }
    
}
