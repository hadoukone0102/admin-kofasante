import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormDonationColumn } from 'src/app/donation/models/form-donation-column.model';
import { FormQuestColumn } from 'src/app/quest/models/quest-type.model';

@Component({
  selector: 'app-quest-modal-column',
  templateUrl: './quest-modal-column.component.html',
  styleUrls: ['./quest-modal-column.component.css']
})
export class QuestModalColumnComponent {

  @Input() listType!: string;
  @Output() formDonationColumnToParent: EventEmitter<FormQuestColumn> = new EventEmitter<FormQuestColumn>();

  //Disable or enable checkbox depending list type
  isAnonymous!: boolean;
  isOrganisation!: boolean;
  formQuestColumn!: FormQuestColumn;

  ngOnInit(): void {
    this.enabledAndInitialiseColumnOfType(this.listType);
  }

  onSubmit(){
    this.formDonationColumnToParent.emit(this.formQuestColumn);
  }

  /**
   * Show Column matching donation type
   * @date 26/05/2023 - 10:53:42 AM
   *
   * @param {string} type
   */
  enabledAndInitialiseColumnOfType(type: string){
    if(type === "all"){
      this.showAllQuest();
    }
  }

  /**
   * Allows to display only columns for the list of anonymous donatitons
   * @date 5/17/2023 - 12:55:09 PM
   */
  showAllQuest(){
    this.isAnonymous = true;
    //Initialisation
    this.formQuestColumn = {
      amountQuest: true,
      quest_types: true,
      masses_id: true,
      days: true,
      name_days: true,
      heure: true,
    }
  }

 
}
