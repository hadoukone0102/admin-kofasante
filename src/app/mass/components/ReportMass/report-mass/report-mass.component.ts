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
// ~~~~~~~~~~~~~~~~~~ Modal of mass report ~~~~~~~~~~~~~~~~~~~~~~
@Input() MassReport!:MassReport;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~perso~~~~~~~~~~~~~~~~~~~~~~
messesAnonymous$!: Observable<MassRequest>;
messesNoAnonymous$!: Observable<anonymosMass>;
allMass$!:Observable<AllMassRequest>;
accumulation!: MassReport;
type!: string;

todayDate!:string;
// variable de recherche

searchBarValue: string = "";
dateStartValue: string = "";
dateEndValue: string = "";
constructor(
  private corservices: CoreService,
  private MassReportServicesService: MassReportServicesService,
){}

ngOnInit(): void{
  this.MassReportServicesService.GetMassReport().subscribe(
    (data)=>{
      this.MassReport = data;
      console.log(this.MassReport);
    }
  )
  const now = new Date();
  this.todayDate = now.toISOString().substring(0, 10); 
  this.dateEndValue = this.todayDate;
  this.dateStartValue = this.todayDate;

 

//initialisation 
  // this.accumulation = {
  //   status: '',
  //   status_code: 0,
  //   status_message: '',
  //   total_messe: this.accumulation.total_messe,
  //   cumul_prix_messe: this.accumulation.cumul_prix_messe,
  //   total_messe_anonymes: this.accumulation.total_messe_anonymes,
  //   cumul_prix_messes_anonymes: this.accumulation.cumul_prix_messes_anonymes,
  //   total_messe_nonanonymes: this.accumulation.total_messe_nonanonymes,
  //   cumul_prix_messes_nonanonymes: this.accumulation.cumul_prix_messes_nonanonymes,

  // }
  
}
  /**
   * get anonymous mass list
   * @date 14/10/23 22:18
   */
  showAnonymousList(){
    this.type ='anonymous';
    this.messesNoAnonymous$ = this.MassReportServicesService.getMassAnonymousWhere();
  }

  
  /**
   * get Isanonymous mass list
   * @date 14/10/23 22:18
   */
  showNoAnonymousList(){
    this.type = 'NoAnonymous'
    this.MassReportServicesService.getMassNoAnonymousWhere();
  }

   /**
   * Get the list of all Mass
   * @date 14/10/2023 - 22:46
   */
   showAllMassList(){
    this.type = "all";
    this.allMass$ = this.MassReportServicesService.getAllMassWhere();
  }

  getAccumlationMass(){
    this.MassReportServicesService.getAccumulationMass(this.searchBarValue, this.dateStartValue, this.dateEndValue)
    .subscribe(data => {
        this.accumulation = data;
      });
  }

/**
   * @date 14/10/2023 - 22:46
   *
   * @param {string} searchBarValue
   */
handleSearchBarValueFromChild(searchBarValue: string) {
  this.searchBarValue = searchBarValue;
  this.getAccumlationMass();
}

/**
   * @date 14/10/2023 - 22:46
   *
   * @param {string} searchBarValue
   */
handleDateStartValueFromChild(dateStartValue: string) {
  this.dateStartValue = dateStartValue;
  this.getAccumlationMass();
}

/**
   * @date 14/10/2023 - 22:46
   *
   * @param {string} searchBarValue
   */
handleDateEndValueFromChild(dateEndValue: string) {
  this.dateEndValue = dateEndValue;
  this.getAccumlationMass();
}



}
