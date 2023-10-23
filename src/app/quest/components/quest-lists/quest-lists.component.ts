import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Quette } from '../../models/quest-type.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quest-lists',
  templateUrl: './quest-lists.component.html',
  styleUrls: ['./quest-lists.component.css']
})
export class QuestListsComponent {
  quest$!: Observable<Quette>;
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
