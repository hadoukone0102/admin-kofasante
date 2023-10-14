import { Component, OnInit } from '@angular/core';
import { QuestTypeByIdModel } from '../../models/quest-type.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-quest-type',
  templateUrl: './edit-quest-type.component.html',
  styleUrls: ['./edit-quest-type.component.css']
})
export class EditQuestTypeComponent implements OnInit{
  questTypeByIdModel!: QuestTypeByIdModel;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.pipe(map(data => data['questTypeByIdResolvers']))
    .subscribe( (data) => {
        this.questTypeByIdModel = data;
      }
    );
  }
}
