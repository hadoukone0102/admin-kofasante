import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { QuestService } from '../services/quest.service';
import { QuestTypeByIdModel } from '../models/quest-type.model';

@Injectable({
  providedIn: 'root'
})
export class QuestTypeByIdResolver implements Resolve<QuestTypeByIdModel> {
  constructor(private questService: QuestService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestTypeByIdModel> {
    const id = route.paramMap.get('id');
    if(id){
      return this.questService.getQuestTypeById(parseInt(id));
    }
    return this.questService.getQuestTypeById(1);
  }
}
