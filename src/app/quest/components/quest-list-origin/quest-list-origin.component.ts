import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { QuestOriginal, Quette } from '../../models/quest-type.model';

@Component({
  selector: 'app-quest-list-origin',
  templateUrl: './quest-list-origin.component.html',
  styleUrls: ['./quest-list-origin.component.css']
})
export class QuestListOriginComponent {
  // quest$!: Observable<Quette>;
  quest$!:Observable<QuestOriginal>
  type!:string;
  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.type='all';
    this.quest$ = this.route.data.pipe(
      map(data=>data['questListsResolver']),
    );
  }
}
