import { Component } from '@angular/core';
import { ActivatedRoute, RouterEvent } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestBasket, QuestOriginal, Quette } from '../../models/quest-type.model';

@Component({
  selector: 'app-quest-basket',
  templateUrl: './quest-basket.component.html',
  styleUrls: ['./quest-basket.component.css']
})
export class QuestBasketComponent {
  quest$!:Observable<Quette>;
  type!:string;
  constructor(
    private route:ActivatedRoute,
  ){}

  ngOnInit(){
    this.type ='basket';
    this.quest$ = this.route.data.pipe(
      map(data=>data['basketQuestResolver'])
    );
  }
}
