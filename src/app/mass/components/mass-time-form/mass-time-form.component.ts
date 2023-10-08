import { Component, Input, OnInit } from '@angular/core';
import { AddMassTimeModel, MassTimeByIdModel, SetMassTimeModel } from '../../models/mass-time.model';
import { MassService } from '../../services/mass.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-mass-time-form',
  templateUrl: './mass-time-form.component.html'
})
export class MassTimeFormComponent implements OnInit{
  @Input() action!: "edit"|"add";
  @Input() massTimeByIdModel!: MassTimeByIdModel;

  errorMessage!: string;
  
  formData!: AddMassTimeModel;
  formDataSet!: SetMassTimeModel;

  isSubmitting: boolean = false;
  formHasError: boolean = false;

  constructor(
    private massService: MassService,
    private coreService: CoreService
    ){}

  ngOnInit(): void {
    console.log(this.action);
    if (this.action === "add") {
      this.formData = {
        time: ""
      }
    } else {
      this.formData = {
        time: this.customTimeFormat(this.massTimeByIdModel.time.times)
      }

      this.formDataSet = {
        time_id: this.massTimeByIdModel.time.id,
        times: this.customTimeFormat(this.massTimeByIdModel.time.times)
      }
      
    }
    
  }

  customTimeFormat(value: string){
    const parts = value.split(":");
    const hours = parts[0];
    const minutes = parts[1];
    return `${hours}:${minutes}`;
  }

  onSubmit(){
    console.log("in the submmit");
    this.isSubmitting = true;
    this.formHasError = false;
    if (this.action === "add") {
      //Add mass time 
      this.massService.addMassTime(this.formData).subscribe(
        (data) => {
          this.isSubmitting = false;
          if (data.success) {
            this.coreService.goToMassTimeList()
          }else{
            this.errorMessage = data.message;
            this.formHasError = true;
          }
        }
      );
    }else{
      //Set mass time

      this.formDataSet.times = this.formData.time;
      this.massService.updateMassTime(this.formDataSet).subscribe(
        (data)=> {
          this.isSubmitting = false;
          if(data.success){
            this.coreService.goToMassTimeList();
          }else{
            this.errorMessage = data.message;
            this.formHasError = true;
          }
        }
      )

    }
  }

}
