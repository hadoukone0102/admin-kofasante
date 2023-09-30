import { Component, OnInit } from '@angular/core';
import { DataSetMassModel, MassModel, SetMassModel } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MassTimeData } from '../../models/mass-time.model';
import { zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-edit-mass',
  templateUrl: './edit-mass.component.html',
  animations: [
    zoomEnterAnimation,
  ]
})
export class EditMassComponent implements OnInit{
  isSubmitting: boolean = false;
  selectedValue: string = ''; // Initialisez-le avec une chaîne vide
  times: string[] = []; // Initialisez-le comme un tableau vide
  formData !: SetMassModel;
  dataSetMassModel !: DataSetMassModel;
  massTimeList!: Array<MassTimeData>;


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

    this.route.data.pipe(map(data => data['listMassTimeResolver']))
    .subscribe( (data) => {
        this.massTimeList = data.time;
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
    console.log(this.formData.typeQuette);
    
    
    this.massService.updateMassDay(this.formData).subscribe(
      (data) => {
        if(data.success){
          console.log("c'est good bro: "+ data.message);
        }else{
          console.log("poto bro"+ data.message );
          
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
    if(this.selectedValue.length != 0){
      const selectedTime = this.dataSetMassModel.masse.times.find(timeObj => timeObj.idMt === idMtToFind);
      if (selectedTime) {
        // console.log(this.dataSetMassModel.masse.times.indexOf(selectedTime));
        const index = this.dataSetMassModel.masse.times.indexOf(selectedTime);
        const time = this.massTimeList.find(data => data.id === parseInt(this.selectedValue) );
        this.dataSetMassModel.masse.times[index].time = time?.times ?? "";
        this.dataSetMassModel.masse.times[index].idMt = parseInt(this.selectedValue);
        console.log(this.dataSetMassModel.masse.times[index].idMt );
        
      } else {
        console.log("Aucun objet correspondant trouvé.");
      }
    }
  }

  deleteMass(id: number){
    if (confirm("Voulez vous vraiment supprimer cette messe ?")) {
      this.massService.deleteMass(id).subscribe(
        (data)=>{
          if(data.success){
            this.massService.getMassDayById(this.dataSetMassModel.masse.id_days).subscribe(
              (data)=>{
                this.dataSetMassModel = data
              }
            )
            console.log("good: "+data.message);
          }else{
            console.log("bad: "+data.message);
          }
        } 
      );
    }
  }

  trackById(index: number, data: any): number {
    return data.idMt; // Remplacez "id" par la propriété unique de votre administrateur
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
