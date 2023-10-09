import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { MassRequestService } from '../components/mass-request-services/mass-request.service';
import { anonymosMass } from '../components/mass-request-models/mass-request.model';

@Component({
  selector: 'app-mass-anonymous-request',
  templateUrl: './mass-anonymous-request.component.html',
})
export class MassAnonymousRequestComponent {
  // ~~~~~~~~~~~~~~~~~~~~Model~~~~~~~~~~~~~~~~~~~~~~~~
  massAnonyResquest!:anonymosMass;
  // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;
  constructor(
    private coreService: CoreService,
    private massRequestService: MassRequestService,
  ){}
  
  ngOnInit(){
    this.massRequestService.getResquestMassAnonymous().subscribe(
      (data)=>{
        this.massAnonyResquest = data;  
        console.log(this.massAnonyResquest.demande_messe);
      }
    )
    // this.checkAndApplyDisabled(this.massRequests);
  }

  goToEditMass(id: number){
  this.coreService.goToEditMass(id);
}

  /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 10/08/2023 - 17:00:43 PM
   *
   * @param {DataDon} data
   */
  checkAndApplyDisabled(data: anonymosMass){
    //NOTE - "1" means that it should be disabled and "..." that it should be enabled
    if((data.current_page === 1) && (data.current_page != data.last_page)){
      //("1/...")
      this.isFirstPage = "disabled";
      this.isLastPage = "";
    }else{
      if((data.current_page === 1) && (data.current_page === data.last_page)){
        //("1/1")
        this.isFirstPage = "disabled";
        this.isLastPage = "disabled";
      }
      else{
        if((data.current_page != 1) && (data.current_page != data.last_page)){
          //(".../...")
          this.isFirstPage  = "";
          this.isLastPage = "";
        }
        else{
            //(".../1")
            this.isFirstPage  = "";
            this.isLastPage = "disabled";
        }
      }
    }
  }

   /**
   * Go to previous page of table
   * @date 
   */
   goToPrevious(){
    this.showPageWhere(-1);
  }
  
  /**
   * Go to next page of table
   * @date 
   */
  goToNext(){
    this.showPageWhere(1);
  }

  /**
   * Get the data matching of the current page of pagination
   * @date 
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.massAnonyResquest.current_page + pageIndex;

    this.massRequestService.getResquestMassAnonymous().subscribe(
      (data)=>{
        this.massAnonyResquest = data;  
        this.checkAndApplyDisabled(data);
      }
    )
  }

/**
 * to redirec page
 */
goToNoAnonymousMassRequest(){
  this.coreService.goToNoAnonymousMassRequest();
}
  
/**
 * to redirec page
 */
  goToAnonymousMassRequest(){
    this.coreService.goToAnonymousMassRequest();
  }
}
