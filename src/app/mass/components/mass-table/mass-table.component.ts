import { Component, Input, OnInit } from '@angular/core';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { CoreService } from 'src/app/core/services/core.service';
import { DeleteMassDayModel, MassDayData, MassModel } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';

@Component({
  selector: 'app-mass-table',
  templateUrl: './mass-table.component.html',
  animations:[
    lineTableAnimation,
  ]
})
export class MassTableComponent implements OnInit{
  @Input() massModel!: MassModel;
  
  // ~~~~~~~~~ Pagination variables ~~~~~~~~ //
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;

  deleteMassDayModel!: DeleteMassDayModel;
  
  constructor(
    private coreService: CoreService,
    private massService: MassService
    ){}

  ngOnInit(): void {
    this.checkAndApplyDisabled(this.massModel);
    this.deleteMassDayModel = {
      day_id : []
    }
    console.table(this.massModel.masses)
  }

  goToEditMass(id: number){
    this.coreService.goToEditMass(id);
  }

  deleteMassDay(id: number){
    if(confirm("Êtes vous sûr de vouloir Supprimer ce jour de messe et toutes les messes à l'intérieur ?")){
    this.massService.deleteMassDay(id).subscribe(
      (data) => {
        if (data.success) {
          console.log("ça passe: "+ data.message);
        }else{
          console.log("ça passe pas"+ data.message);
        }
      }
    )
    }
  }

  trackById(index: number, data: any): number {
    return data.days_id; // Remplacez "id" par la propriété unique de votre administrateur
  }

  /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 5/17/2023 - 1:00:43 PM
   *
   * @param {DataDon} data
   */
  checkAndApplyDisabled(data: MassModel){
    console.log("Page courante: "+ data.last_page);
    
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
   * @date 5/17/2023 - 12:51:29 M
   */
  goToPrevious(){
    this.showPageWhere(-1);
  }
  
  /**
   * Go to next page of table
   * @date 5/17/2023 - 12:52:23 PM
   */
  goToNext(){
    this.showPageWhere(1);
  }

  /**
   * Get the data matching of the current page of pagination
   * @date 5/17/2023 - 12:52:37 PM
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.massModel.current_page + pageIndex;

    this.massService.getMassesList(this.newPage.toString()).subscribe(
      (data)=>{
        this.massModel = data;  
        this.checkAndApplyDisabled(data);
      }
    )
  }
}
