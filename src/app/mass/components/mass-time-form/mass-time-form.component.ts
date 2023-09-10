import { Component, Input, OnInit } from '@angular/core';
import { AddMassTimeModel } from '../../models/mass-time.model';
import { MassService } from '../../services/mass.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-mass-time-form',
  templateUrl: './mass-time-form.component.html'
})
export class MassTimeFormComponent implements OnInit{
  @Input() action!: "edit"|"add";
  
  formData!: AddMassTimeModel;

  isSubmitting: boolean = false;
  timeExists: boolean = false;
  constructor(
    private massService: MassService,
    private coreService: CoreService
    ){}

  ngOnInit(): void {
    console.log(this.action);
    this.formData = {
      time: ""
    }
    
  }

  onSubmit(){
    console.log("in the submmit");
    this.isSubmitting = true;
    this.timeExists = false;
    if (this.action === "add") {
      //Add mass time 
      this.massService.addMassTime(this.formData).subscribe(
        (data) => {
          this.isSubmitting = false;
          console.log(data.success);
          if (data.success) {
            this.coreService.goToMassTimeList()
          }else{
            this.timeExists = true;
          }
          
        }
      );
    }else{
      //Set mass time

    }
  }

}
