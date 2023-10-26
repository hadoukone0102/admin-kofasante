import { Component, Input } from '@angular/core';
import { Quest, QuestOriginalChild } from 'src/app/quest/models/quest-type.model';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent {
@Input() ModalComponent!:QuestOriginalChild;
@Input() receveData!:Array<Quest>
constructor(){}

ngOnInit():void{

}

}
