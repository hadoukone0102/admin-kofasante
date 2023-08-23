import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-mass',
  templateUrl: './edit-mass.component.html'
})
export class EditMassComponent {
  isSubmitting: boolean = false;
  timesFields: any[] = [{ id: 1 }];

  onSubmit(){

  }

  addTimeField() {
    const newTimesFields = { id: this.timesFields.length + 1 };
    this.timesFields.push(newTimesFields);
  }
  
  deleteTimeField(){
    this.timesFields.pop();
  }

  timesFieldIsAlone(){
    return this.timesFields.length === 1 ? true : false;
  }
}
