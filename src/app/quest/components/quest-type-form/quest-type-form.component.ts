import { Component, Input, OnInit } from '@angular/core';
import { AddQuestTypeModel, QuestTypeByIdModel, SetQuesTypeModel } from '../../models/quest-type.model';
import { QuestService } from '../../services/quest.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-quest-type-form',
  templateUrl: './quest-type-form.component.html',
  styleUrls: ['./quest-type-form.component.css']
})
export class QuestTypeFormComponent implements OnInit{
  @Input() action!: "edit"|"add";
  @Input() questTypeByIdModel!: QuestTypeByIdModel;

  errorMessage!: string;

  formData!: AddQuestTypeModel;
  formDataSet!: SetQuesTypeModel;

  isSubmitting: boolean = false;
  formHasError: boolean = false;

  constructor(
    private questService: QuestService,
    private coreService: CoreService
    ){}

    ngOnInit(): void {
      if (this.action === "add") {
        this.formData = {
          labelQt: ""
        }
      } else {
        this.formData = {
          labelQt: this.questTypeByIdModel.questType.labelQt
        }
  
        this.formDataSet = {
          id: this.questTypeByIdModel.questType.id.toString(),
          labelQt: this.questTypeByIdModel.questType.labelQt
        }
        
      }
    }

    onSubmit(){
      this.isSubmitting = true;
      this.formHasError = false;
      if (this.action === "add") {
        //Add mass time 
        this.questService.addQuestType(this.formData).subscribe(
          (data) => {
            this.isSubmitting = false;
            if (data.success) {
              this.coreService.goToQuestTypeList();
            }else{
              this.errorMessage = data.message;
              this.formHasError = true;
            }
          }
        );
      }else{
        //Set mass time

        this.formDataSet.labelQt = this.formData.labelQt;
        this.questService.updateQuestType(this.formDataSet).subscribe(
          (data)=> {
            this.isSubmitting = false;
            if(data.success){
              this.coreService.goToQuestTypeList();
            }else{
              this.errorMessage = data.message;
              this.formHasError = true;
            }
          }
        )

      }
    }
}
