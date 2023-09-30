import { Component, OnInit } from '@angular/core';
import { MassService } from '../../services/mass.service';
import { AddMassModel } from '../../models/mass.model';

@Component({
  selector: 'app-add-mass',
  templateUrl: './add-mass.component.html'
})
export class AddMassComponent implements OnInit{
  isSubmitting: boolean = false;
  timeSelected: string = ''; 
  // formData.days_name: string[] = [];
  questTypeSelected: string = '';
  times: string[] = ["8:00", "20:00"]; 
  questTypes: string[] = ["Normal"]; 

  monday!: string;

  timeIsSelected: boolean = true;
  questTypeIsSelected: boolean = true;

  formData1 = {
    startDate: "",
    endDate: "",
    questTypes: []
  }

  formData: AddMassModel ={
    date_debut: "",
    date_fin: "",
    times: [],
    days_name: [],
    typeQuette: [],
  } 

  dayData = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true
  }

  constructor(
    private massService: MassService
  ){}

  ngOnInit(): void {
    // this.timeSelecteds[1]="18:00";
    console.log(this.times);
    this.noTimeSelected();
    this.noQuestTypeSelected();
    this.noDaySelected();
    this.getDayValue();
  }

  getDayValue(){
    //we empty the table
    this.formData.days_name.splice(0, this.formData.days_name.length);

    if(this.dayData.monday){
      this.formData.days_name.push("lundi");
    }
    if(this.dayData.tuesday){
      this.formData.days_name.push("mardi");
    }
    if(this.dayData.wednesday){
      this.formData.days_name.push("mercredi");
    }
    if(this.dayData.thursday){
      this.formData.days_name.push("jeudi");
    }
    if(this.dayData.friday){
      this.formData.days_name.push("vendredi");
    }
    if(this.dayData.saturday){
      this.formData.days_name.push("samedi");
    }
    if(this.dayData.sunday){
      this.formData.days_name.push("dimanche");
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    this.massService.addMasses(this.formData).subscribe(
      (data)=>{
        this.isSubmitting = false;
        if(data.success){
          console.log("good");
        }else{
          console.log("bad: "+data.message+" "+data.success);
        }
      }
    )
    console.log(this.formData);
    
  } 

   // Méthode pour ajouter une heure à la liste
   addTime() {
    if (this.timeSelected) {
      this.formData.times.push(this.timeSelected);
      this.timeIsSelected = true;
    }else{
      this.timeIsSelected = false;
    }
  }

   addQuestType() {
    if (this.questTypeSelected) {
      this.formData.typeQuette.push(this.questTypeSelected);
      this.questTypeIsSelected = true;
    }else{
      this.questTypeIsSelected = false;
    }
  }

  // Méthode pour modifier une heure existante
  setTime(index: number) {
    if (this.timeSelected) {
      this.formData.times[index] = this.timeSelected;
      this.timeIsSelected = true;
    }else{
      this.timeIsSelected = false;
    }
  }
  
  setQuestType(index: number) {
    if (this.questTypeSelected) {
      this.formData.typeQuette[index] = this.questTypeSelected;
      this.questTypeIsSelected = true;
    }else{
      this.questTypeIsSelected = false;
    }
  }

  deleteTime(){
    this.formData.times.pop();
  }
  
  deleteQuestType(){
    this.formData.typeQuette.pop();
  }

  noTimeSelected(){
    return this.formData.times.length === 0 ? true : false;
  }
  noQuestTypeSelected(){
    return this.formData.typeQuette.length === 0 ? true : false;
  }
  noDaySelected(){
    return this.formData.days_name.length === 0 ? true : false;
  }

  getTimesSelected() {
    // for (let i = 0; i < this.timeSelecteds.length; i++) {
    //   console.log(this.timeSelecteds[i]);
    // }
    console.log(this.formData.times.length);
    console.log(this.noTimeSelected());
  }
}
