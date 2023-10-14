import { Component, OnInit } from '@angular/core';
import { DataSetMassModel, MassModel, SetMassModel } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MassTimeData } from '../../models/mass-time.model';
import { zoomEnterAnimation } from 'src/app/core/animations/animations';
import { sharedMassData } from '../../sharedMassData';
import { CoreService } from 'src/app/core/services/core.service';
import { QuestTypeModel } from 'src/app/quest/models/quest-type.model';

@Component({
  selector: 'app-edit-mass',
  templateUrl: './edit-mass.component.html',
  animations: [
    zoomEnterAnimation,
  ]
})
export class EditMassComponent implements OnInit{
  isSubmitting: boolean = false;
  times: string[] = []; // Initialisez-le comme un tableau vide
  formData !: SetMassModel;
  dataSetMassModel !: DataSetMassModel;
  massTimeList!: Array<MassTimeData>;
  questTypeModel!: QuestTypeModel;

  selectedValue: string = ''; // Initialisez-le avec une chaîne vide
  questTypeSelected: string = '';

  setButtonText: string = "Modifier";

  isButtonDisabled: { [key: string]: {state :boolean, setButtonText: string, deleteButtonText: string} } = {};

  // ~~~~~~~~~~~~ Error message ~~~~~~~~~~~~ //
  pageHasError: boolean = false;
  errorMessage!: string;
  successfulOperation: boolean = false;

  // ~~~~~~~~~~~~~~~ Boolean ~~~~~~~~~~~~~~~ //
  timeIsInList: boolean = false;
  timeIsSelected: boolean = true;
  questTypeIsInList: boolean = false;
  questTypeIsSelected: boolean = true;


  constructor(
    private massService: MassService, 
    private route: ActivatedRoute,
    private coreService: CoreService
    ){}

  ngOnInit(): void {
    // this.selectedValues[1]="18:00";
    console.log(this.times);
    this.noValueSelected();

    this.route.data.pipe(map(data => data['massDayByIdResolvers']))
    .subscribe( (data) => {
        this.dataSetMassModel = data;
      }
    );

    this.route.data.pipe(map(data => data['listMassTimeResolver']))
    .subscribe( (data) => {
        this.massTimeList = data.time;
      }
    );
    
    this.route.data.pipe(map(data => data['listQuestTypeResolver']))
    .subscribe( (data) => {
        this.questTypeModel = data;
      }
    );

    this.dataSetMassModel.masse.times.forEach((mass) => {
      this.isButtonDisabled[mass.id_masse] =  { 
        state: false, 
        setButtonText: 'Modifier',
        deleteButtonText: 'Supprimer'
       }; // Initialisation à false
    });

    this.formData = {
      id : 0,
      typeQuette: [],
      masses_times_id: 0
    };
  }

  onSubmit(idMass:number, idMassTime:number, quests:string[]){
    this.formData.id = idMass;
    this.formData.masses_times_id = idMassTime;
    this.formData.typeQuette = quests
    
    this.isButtonDisabled[idMass].state = true;
    this.isButtonDisabled[idMass].setButtonText = "Modifier...";
    this.successfulOperation = false;
    this.pageHasError = false;
    
    this.massService.updateMassDay(this.formData).subscribe(
      (data) => {
        this.isButtonDisabled[idMass].state = false;
        this.isButtonDisabled[idMass].setButtonText = "Modifier";
        if(data.success){
          this.successfulOperation = true;
        }else{
          this.pageHasError = true;
          this.errorMessage =data.message

        }
      }
    )
    
  } 

   // Méthode pour ajouter une heure à la liste
   addTime() {
    if (this.selectedValue) {
      this.times.push(this.selectedValue);
    }
  }

  // Méthode pour modifier une heure existante
  setTime(idMtToFind: number) {
    //If time selected is already in the list
    console.log("idTIME; "+idMtToFind);
    this.timeIsInList = this.dataSetMassModel.masse.times.some(times => times.idMt === parseInt(this.selectedValue));
    if (!this.timeIsInList) {
      if(this.selectedValue.length != 0){
        this.timeIsSelected = true;
        const selectedTime = this.dataSetMassModel.masse.times.find(timeObj => timeObj.idMt === idMtToFind);
        if (selectedTime) {
          // console.log(this.dataSetMassModel.masse.times.indexOf(selectedTime));
          const index = this.dataSetMassModel.masse.times.indexOf(selectedTime);
          const time = this.massTimeList.find(data => data.id === parseInt(this.selectedValue) );
          this.dataSetMassModel.masse.times[index].time = time?.times ?? "";
          this.dataSetMassModel.masse.times[index].idMt = parseInt(this.selectedValue);
          // console.log(this.dataSetMassModel.masse.times[index].idMt );
          
        } else {
          console.log("Aucun objet correspondant trouvé.");
        }
      }else{
        this.timeIsSelected = false;
      }
    }
    
  }
  setQuestType(idMtToFind: number, quesTypeToModify: string) {
    //If time selected is already in the list
    console.log("id; "+idMtToFind);
    
    const selectedTime = this.dataSetMassModel.masse.times.find(data => data.idMt === idMtToFind)
    this.questTypeIsInList = selectedTime?.questType.includes(this.questTypeSelected) ?? false;
    console.log("boom: "+this.questTypeSelected);
    
    if (!this.questTypeIsInList) {
      if(this.questTypeSelected.length != 0){
        this.questTypeIsSelected = true;
        if (selectedTime) {
          // console.log(this.dataSetMassModel.masse.times.indexOf(selectedTime));
          const index = this.dataSetMassModel.masse.times.indexOf(selectedTime);

            const questTypeTable = this.dataSetMassModel.masse.times[index].questType;
            this.dataSetMassModel.masse.times[index].questType = [];

            questTypeTable.forEach(data => {
              if (data != quesTypeToModify) {
                this.dataSetMassModel.masse.times[index].questType.push(data)
              }
            });
            this.dataSetMassModel.masse.times[index].questType.push(this.questTypeSelected);
          
        } else {
          this.questTypeIsSelected = false;
          // console.log("Aucun objet correspondant trouvé.");
        }
      }else{
        this.questTypeIsSelected = false;
      }
    }
    
  }

  deleteMass(idMass: number){
    if (confirm("Voulez vous vraiment supprimer cette messe ?")) {
      this.isButtonDisabled[idMass].state = true;
      this.isButtonDisabled[idMass].deleteButtonText = "Supprimer...";
      this.pageHasError = false;
      this.successfulOperation = false;

      this.massService.deleteMass(idMass).subscribe(
        (data)=>{
          this.isButtonDisabled[idMass].state = false;
          this.isButtonDisabled[idMass].deleteButtonText = "Supprimer";
          if(data.success){
            this.successfulOperation = true;
            this.massService.getMassDayById(this.dataSetMassModel.masse.id_days).subscribe(
              (data)=> this.dataSetMassModel = data
            )
          }else{
            this.pageHasError = true;
            this.errorMessage = data.message;
          }
        } 
      );
    }
  }

  trackById(index: number, data: any): number {
    return data.idMt+data.time; // Remplacez "id" par la propriété unique de votre administrateur
  }

  noValueSelected(){
    return this.times.length === 0 ? true : false;
  }

  getSelectedValues() {
    // for (let i = 0; i < this.selectedValues.length; i++) {
    //   console.log(this.selectedValues[i]);
    // }
    console.log(this.times.length);
    console.log(this.noValueSelected());
  }

  addMass(){
    sharedMassData.dataFromEditMass.massDate=this.dataSetMassModel.masse.date;
    sharedMassData.dataFromEditMass.idDay=this.dataSetMassModel.masse.id_days;
    this.coreService.goToAddMass();
    }
}
