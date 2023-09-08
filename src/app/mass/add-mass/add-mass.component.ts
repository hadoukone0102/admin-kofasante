import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-mass',
  templateUrl: './add-mass.component.html'
})
export class AddMassComponent implements OnInit{
  isSubmitting: boolean = false;
  timesFields: any[] = [{ id: 1 }];
  selectedValues: string[] = ['18:00']; // Initialisez-le avec une valeur par défaut

  ngOnInit(): void {
    // this.selectedValues[1]="18:00";
  }

  onSubmit(){

  }

  addTimeField() {
    console.log("avant: ");
    console.log(this.selectedValues);

    const newTimesField = { id: this.timesFields.length + 1 };
    this.timesFields.push(newTimesField);
    this.selectedValues.push('18:00'); // Ajoutez une valeur par défaut

    console.log("après: ");
    console.log(this.selectedValues);
  }

  deleteTimeField(){
    this.timesFields.pop();
    this.selectedValues.pop();
  }

  timesFieldIsAlone(){
    return this.timesFields.length === 1 ? true : false;
  }

  getSelectedValues() {
    for (let i = 0; i < this.selectedValues.length; i++) {
      console.log(this.selectedValues[i]);
    }
  }
}
