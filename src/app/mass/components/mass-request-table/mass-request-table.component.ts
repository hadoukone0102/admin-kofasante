import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { ChildMassRequest, MassRequest } from '../mass-request-models/mass-request.model';
import { MassRequestService } from '../mass-request-services/mass-request.service';
@Component({
  selector: 'app-mass-request-table',
  templateUrl: './mass-request-table.component.html'
})
export class MassRequestTableComponent {
  // ~~~~~~~~~~~~~~~Model mass request~~~~~~~~~~~~~~~~~~
  massRequests!:MassRequest;
  childMassRequests: ChildMassRequest[]=[];

  // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~éé
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;
  
  constructor(
    private coreService: CoreService,
    private massRequestService: MassRequestService,
    ){}

    ngOnInit(){
      this.massRequestService.getMassRequests().subscribe(
        (data)=>{
          this.massRequests = data;  
          //console.log(this.massRequests.demande_messe);
        }
      )
    }

    ShowMassRequest(){
      
    }


  goToEditMass(){
    // this.coreService.goToEditMass();
  }
}
