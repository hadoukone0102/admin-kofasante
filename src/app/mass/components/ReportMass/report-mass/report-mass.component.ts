import { Component, Input } from '@angular/core';
import { AllMassRequest, MassReport } from '../models/mass-report-model.model';
import { CoreService } from 'src/app/core/services/core.service';
import {MassReportServicesService } from '../../ReportMass/services/mass-report-services.service'
import { zoomEnterAnimation } from 'src/app/core/animations/animations';
import { MassRequest, anonymosMass } from '../../mass-request-models/mass-request.model';
import { Observable, map } from 'rxjs';
import { DataAccumulation } from 'src/app/donation/models/accumulation.model';
import { ActivatedRoute } from '@angular/router';
import { MassRequestService } from '../../mass-request-services/mass-request.service';

@Component({
  selector: 'app-report-mass',
  templateUrl: './report-mass.component.html',
  animations:[
    zoomEnterAnimation
  ]
})
export class ReportMassComponent {
 //~~~~~~~~~~~~variable imporatant~~~~~~~~~~~~~~~~
 messe$!: Observable<MassRequest>;
 accumulation!: MassReport;
 type!: string;

 todayDate!:string;
 searchBarValue: string = "";
 dateStartValue: string = "";
 dateEndValue: string = "";

 constructor(
   private route: ActivatedRoute,
   private massServices: MassRequestService,
 ){}

 ngOnInit():void{

   this.type="all";
   this.messe$ =  this.route.data.pipe(
     map(data => data['reportMassRequest']),
   );

   const now = new Date();
   this.todayDate = now.toISOString().substring(0, 10); 
   this.dateEndValue = this.todayDate;
   this.dateStartValue = this.todayDate;

   this.accumulation = {//initialization  
     status : '',
     status_code : 0,
     status_message : '',
     total_messe: 0,
     cumul_prix_messe: 0,
     total_messe_anonymes: 0,
     cumul_prix_messes_anonymes: 0,
     total_messe_nonanonymes: 0,
     cumul_prix_messes_nonanonymes: 0,
   }

 }


 showAnonymousList(){
   this.type = "anonymous";
   this.messe$ = this.massServices.getMassAnonymousWhere();
 }
 showNoAnonumousList(){
   this.type = "noAnonymous";
   this.messe$ = this.massServices.getMassNoAnonymousWhere();
 }
 showAllMass(){
   this.type="all";
   this.messe$ = this.massServices.getAllMass();
 }

  /**
  * @date 
  */
  getAccumlationMass(){
   this.massServices.getAccumulationMass(this.searchBarValue, this.dateStartValue, this.dateEndValue)
   .subscribe(data => {
       this.accumulation = data;
     });
 }

 /**
  * @date 
  *
  * @param {string} searchBarValue
  */
 handleSearchBarValueFromChild(searchBarValue: string) {
   this.searchBarValue = searchBarValue;
   this.getAccumlationMass();
 }

 /**
  * @date 
  *
  * @param {string} dateStartValue
  */
 handleDateStartValueFromChild(dateStartValue: string) {
   this.dateStartValue = dateStartValue;
   this.getAccumlationMass();
 }

 /**
  * @date 
  *
  * @param {string} dateEndValue
  */
 handleDateEndValueFromChild(dateEndValue: string) {
   this.dateEndValue = dateEndValue;
   this.getAccumlationMass();
 }



 showNoAnonymousPersoList(){}
 showNoAnonymousOrgaList(){}
 showAllDonationsList(){}


}
