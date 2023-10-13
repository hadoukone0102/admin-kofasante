import { Component, Input } from '@angular/core';
import { MassReport } from '../models/mass-report-model.model';
import { CoreService } from 'src/app/core/services/core.service';
import {MassReportServicesService } from '../../ReportMass/services/mass-report-services.service'
import { zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-report-mass',
  templateUrl: './report-mass.component.html',
  animations:[
    zoomEnterAnimation
  ]
})
export class ReportMassComponent {
// ~~~~~~~~~~~~~~~~~~ Modal of mass report ~~~~~~~~~~~~~~~~~~~~~~
@Input() MassReport!:MassReport;

constructor(
  private corservices: CoreService,
  private MassReportServicesService: MassReportServicesService,
){}

ngOnInit(){
  this.MassReportServicesService.GetMassReport().subscribe(
    (data)=>{
      this.MassReport = data;
      console.log(this.MassReport);
    }
  )
  
}

  showAnonymousList(){}
  showNoAnonymousPersoList(){}
  showNoAnonymousOrgaList(){}
  showAllDonationsList(){}
}
