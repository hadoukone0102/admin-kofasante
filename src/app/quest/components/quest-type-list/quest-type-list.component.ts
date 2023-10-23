import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { QuestService } from '../../services/quest.service';
import { QuestTypeModel } from '../../models/quest-type.model';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { lineTableAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-quest-type-list',
  templateUrl: './quest-type-list.component.html',
  animations:[
    lineTableAnimation
  ]
})
export class QuestTypeListComponent implements OnInit{
  questTypeModel!: QuestTypeModel;

  pageHasError: boolean = false;
  errorMessage!: string;

  constructor(
    private coreService: CoreService,
    private route: ActivatedRoute,
    private questService: QuestService
    ){}
  
  ngOnInit(): void {
    this.route.data.pipe(map(data => data['listQuestTypeResolver']))
    .subscribe( (data) => {
        this.questTypeModel = data;
      }
    );
  }

  trackById(index: number, data: any): number {
    return data.id; // Remplacez "id" par la propriété unique de votre administrateur
  }

  goToEditQuestType(id: number){
    this.coreService.goToEditQuestType(id);
  }

  deleteQuestType(id: number){
    this.pageHasError = false;
    if(confirm("Voulez vous vraiment supprimer ce type de quête ?")){
      this.questService.deleteQuestType(id).subscribe(
        (data) => {
          if (data.success) {
            console.log(data.message);
            this.questService.getQuestTypeList().subscribe(
              (data) => {
                this.questTypeModel = data;
              }
            )
          }else{
            this.pageHasError = true;
            this.errorMessage = data.message;
          }
        }
      )
    }
  }


}
