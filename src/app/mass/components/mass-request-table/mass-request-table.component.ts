import { Component, Input } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { ChildMassRequest, MassRequest, Masses } from '../mass-request-models/mass-request.model';
import { MassRequestService } from '../mass-request-services/mass-request.service';
@Component({
  selector: 'app-mass-request-table',
  templateUrl: './mass-request-table.component.html'
})
export class MassRequestTableComponent {
  // ~~~~~~~~~~~~~~~Model mass request~~~~~~~~~~~~~~~~~~
  @Input() massRequests!:MassRequest;

  @Input() Masses!:ChildMassRequest;
 
  childMassRequests: ChildMassRequest[]=[];

  // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~
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
          console.log(this.massRequests.demande_messe);
        }
      )
      this.massRequestService.getMass().subscribe(
        (data)=>{
          this.Masses = data;
          console.log(this.Masses.masses);
        }
      )
      //this.checkAndApplyDisabled(this.massRequests);
    }
    
    getUniqueDates(dates: string[]): string[] {
      return Array.from(new Set(dates)); // Utilisez un ensemble pour garantir des dates uniques
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
  checkAndApplyDisabled(data: MassRequest){
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
    this.newPage= this.massRequests.current_page + pageIndex;

    this.massRequestService.getMassRequests().subscribe(
      (data)=>{
        this.massRequests = data;  
        this.checkAndApplyDisabled(data);
      }
    )
  }

  goToAnonymousMassRequest(){
    this.coreService.goToAnonymousMassRequest();
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~for Search ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  resetFilter(){

  }

  export(){

  }

  search(){

  }
  
  exportToPDF(){

  }

  exportToExel(){
    
  }
}
