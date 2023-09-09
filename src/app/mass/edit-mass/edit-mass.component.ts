import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-mass',
  templateUrl: './edit-mass.component.html'
})
export class EditMassComponent {
  isSubmitting: boolean = false;
  selectedValue: string = ''; // Initialisez-le avec une chaîne vide
  times: string[] = []; // Initialisez-le comme un tableau vide
  formData = {
    startDate: "",
    endDate: "",
  }

  ngOnInit(): void {
    // this.selectedValues[1]="18:00";
    console.log(this.times);
    this.noValueSelected();
  }

  onSubmit(){

  } 

   // Méthode pour ajouter une heure à la liste
   addTime() {
    if (this.selectedValue) {
      this.times.push(this.selectedValue);
    }
  }

  // Méthode pour modifier une heure existante
  setTime(index: number) {
    this.times[index] = this  .selectedValue;
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
