import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { QuestService } from '../services/quest.service';
import { QuestOriginal } from '../models/quest-type.model';

@Injectable({
  providedIn: 'root'
})
export class QuestListOriginalResolver implements Resolve<QuestOriginal> {
  constructor(
    private questService: QuestService,
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<QuestOriginal> {
    return this.questService.getQuestWithMass();
  }
}
