import { Component } from '@angular/core';

@Component({
  selector: 'app-mass-time-form',
  templateUrl: './mass-time-form.component.html'
})
export class MassTimeFormComponent {

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
