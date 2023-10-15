import { Component, Input } from '@angular/core';
import { AllMassRequest, MassReport } from '../models/mass-report-model.model';
import { CoreService } from 'src/app/core/services/core.service';
import {MassReportServicesService } from '../../ReportMass/services/mass-report-services.service'
import { zoomEnterAnimation } from 'src/app/core/animations/animations';
import { MassRequest, anonymosMass } from '../../mass-request-models/mass-request.model';
import { Observable } from 'rxjs';
import { DataAccumulation } from 'src/app/donation/models/accumulation.model';

@Component({
  selector: 'app-report-mass',
  templateUrl: './report-mass.component.html',
  animations:[
    zoomEnterAnimation
  ]
})
export class ReportMassComponent {


}
