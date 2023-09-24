import { Component, OnInit } from '@angular/core';
import { DataSetMassModel, HourQuest, MassModel, SetMassModel } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-mass',
  templateUrl: './edit-mass.component.html'
})
export class EditMassComponent implements OnInit{
  isSubmitting: boolean = false;
  selectedValue: string = ''; // Initialisez-le avec une chaîne vide
  times: string[] = []; // Initialisez-le comme un tableau vide
  formData !: SetMassModel;
  dataSetMassModel !: DataSetMassModel;


  hourQuests: HourQuest[] = [
    {
      hour: '19:30',
      quests: ['normal', 'normal']
    },
    {
      hour: '20:30',
      quests: ['normal', 'normal']
    },
    // Ajoutez d'autres heures et quêtes au besoin
  ];

  constructor(private massService: MassService, private route: ActivatedRoute){}

  ngOnInit(): void {
    // this.selectedValues[1]="18:00";
    console.log(this.times);
    this.noValueSelected();

    this.route.data.pipe(map(data => data['massDayByIdResolvers']))
    .subscribe( (data) => {
        this.dataSetMassModel = data;
      }
    );

    this.formData = {
      id : 0,
      typeQuette: [],
      masses_times_id: 0
    };
    // this.dataSetMassModel = {
    //   masse : {
    //     id_days: 0,
    //     date: "",
    //     days: "",
    //     times: [
    //       {
    //         idMt: 4,
    //         time: "10:00",
    //         questType: ["normal", "spéciale"]
    //       },
    //       {
    //         idMt: 3,
    //         time: "15:35",
    //         questType: ["normal", "Bateau"]
    //       },

    //     ]
    //   }
    // }

    

    
  }

  onSubmit(idMass:number, idMassTime:number, quests:string[]){
    this.formData.id = idMass;
    this.formData.masses_times_id = idMassTime;
    this.formData.typeQuette = quests
    
    
  } 

   // Méthode pour ajouter une heure à la liste
   addTime() {
    if (this.selectedValue) {
      this.times.push(this.selectedValue);
    }
  }

  // Méthode pour modifier une heure existante
  setTime(idMtToFind: number) {
    if(this.selectedValue.length != 0){
      const selectedTime = this.dataSetMassModel.masse.times.find(timeObj => timeObj.idMt === idMtToFind);
      if (selectedTime) {
        // console.log(this.dataSetMassModel.masse.times.indexOf(selectedTime));
        const index = this.dataSetMassModel.masse.times.indexOf(selectedTime);
        this.dataSetMassModel.masse.times[index].time = this.selectedValue;
      } else {
        console.log("Aucun objet correspondant trouvé.");
      }
    }
  }

  deleteTimeField(){
    this.times.pop();
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
}
