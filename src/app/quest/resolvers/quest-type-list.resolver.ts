import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { QuestService } from '../services/quest.service';
import { QuestTypeModel } from '../models/quest-type.model';

@Injectable({
  providedIn: 'root'
})
export class QuestTypeListResolver implements Resolve<QuestTypeModel> {
  constructor(private questService: QuestService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestTypeModel> {
    return this.questService.getQuestTypeList();
  }
}
