import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-mass',
  templateUrl: './add-mass.component.html'
})
export class AddMassComponent implements OnInit{
  isSubmitting: boolean = false;
  timeSelected: string = ''; 
  daysSelected: string[] = [];
  questTypeSelected: string = '';
  times: string[] = ["8:00", "20:00"]; 
  questTypes: string[] = ["Normal"]; 

  monday!: string;

  timeIsSelected: boolean = true;
  questTypeIsSelected: boolean = true;

  formData = {
    startDate: "",
    endDate: "",
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

  ngOnInit(): void {
    // this.timeSelecteds[1]="18:00";
    console.log(this.times);
    this.noTimeSelected();
    this.noQuestTypeSelected();
    this.getDayValue();
  }

  getDayValue(){
    //we empty the table
    this.daysSelected.splice(0, this.daysSelected.length);

    if(this.dayData.monday){
      this.daysSelected.push("lundi");
    }
    if(this.dayData.tuesday){
      this.daysSelected.push("mardi");
    }
    if(this.dayData.wednesday){
      this.daysSelected.push("mercredi");
    }
    if(this.dayData.thursday){
      this.daysSelected.push("jeudi");
    }
    if(this.dayData.friday){
      this.daysSelected.push("vendredi");
    }
    if(this.dayData.saturday){
      this.daysSelected.push("samedi");
    }
    if(this.dayData.sunday){
      this.daysSelected.push("dimanche");
    }
  }

  onSubmit(){

  } 

   // Méthode pour ajouter une heure à la liste
   addTime() {
    if (this.timeSelected) {
      this.times.push(this.timeSelected);
      this.timeIsSelected = true;
    }else{
      this.timeIsSelected = false;
    }
  }
   addQuestType() {
    if (this.questTypeSelected) {
      this.questTypes.push(this.questTypeSelected);
      this.questTypeIsSelected = true;
    }else{
      this.questTypeIsSelected = false;
    }
  }

  // Méthode pour modifier une heure existante
  setTime(index: number) {
    if (this.timeSelected) {
      this.times[index] = this.timeSelected;
      this.timeIsSelected = true;
    }else{
      this.timeIsSelected = false;
    }
  }
  
  setQuestType(index: number) {
    if (this.questTypeSelected) {
      this.questTypes[index] = this.questTypeSelected;
      this.questTypeIsSelected = true;
    }else{
      this.questTypeIsSelected = false;
    }
  }

  deleteTime(){
    this.times.pop();
  }
  
  deleteQuestType(){
    this.questTypes.pop();
  }

  noTimeSelected(){
    return this.times.length === 0 ? true : false;
  }
  noQuestTypeSelected(){
    return this.questTypes.length === 0 ? true : false;
  }
  noDaySelected(){
    return this.daysSelected.length === 0 ? true : false;
  }

  getTimesSelected() {
    // for (let i = 0; i < this.timeSelecteds.length; i++) {
    //   console.log(this.timeSelecteds[i]);
    // }
    console.log(this.times.length);
    console.log(this.noTimeSelected());
  }
}
