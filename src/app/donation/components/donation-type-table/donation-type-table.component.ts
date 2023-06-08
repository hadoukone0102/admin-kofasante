import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DonationTypeData, DonationTypeModel } from '../../models/donation-type.model';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-type-table',
  templateUrl: './donation-type-table.component.html',
  animations:[
    lineTableAnimation,
  ]
})
export class DonationTypeTableComponent implements OnInit{
  // ~~~~~~~~~~ Decorated variables ~~~~~~~~~ //
  @Input() donationTypeModel!: DonationTypeModel;
  @Input() listType!: "disabled" | "enabled";
  
  donationTypeData!: DonationTypeData;

  constructor(private coreService: CoreService, private donationService: DonationService){}

  ngOnInit(): void {
   
  }

  
  /**
   * trackBy method to identify each administrator by their unique id
   * @date 6/8/2023 - 10:03:34 AM
   *
   * @param {number} index
   * @param {*} donationType
   * @returns {number}
   */
  trackByDonationTypeId(index: number, donationType: any): number {
    return donationType.id; // Remplacez "id" par la propriété unique de votre administrateur
  }

  /**
   * Go to the edition page for the specified donation type
   * @date 6/5/2023 - 4:32:50 PM
   */
  goToEditDonationType(id: number){
    this.coreService.goToEditDonationType(id);
  }

  /**
   * Desabled the specified donation type
   * @date 6/5/2023 - 4:32:11 PM
   */
  disableDonationType(id: number){
    if(confirm("Etes vous sur de vouloir désactiver ce type de don ?")){
      this.donationService.disableDonationType(id.toString()).subscribe(data =>{
        this.donationService.getListDonationType().subscribe(
          data => this.donationTypeModel = data,
          error => console.log("Une erreur s'est produite: "+error)
        );
      } 
      );
    }
  }

  /**
   * Enable the specified donation type
   * @date 6/8/2023 - 10:02:06 AM
   *
   * @param {number} id
   */
  enableDonationType(id: number){
    if(confirm("Etes vous sûr de vouloir restorer ce type de don ?")){
      this.donationService.enableDonationType(id.toString()).subscribe(data =>{
        this.donationService.getListDisabledDonationType().subscribe(
          data => this.donationTypeModel = data,
          error => console.log("Une erreur s'est produite: "+error)
        );
      } 
      );
    }
  }
  
  /**
   * delete the specified donation type
   * @date 6/8/2023 - 10:02:35 AM
   *
   * @param {number} id
   */
  deleteDonationType(id: number){
    if(confirm("Etes vous sûr de vouloir supprimer ce type de don ?")){
      this.donationService.deleteDonationType(id.toString()).subscribe(data =>{
        this.donationService.getListDisabledDonationType().subscribe(
          data => this.donationTypeModel = data,
          error => console.log("Une erreur s'est produite: "+error)
        );
      } 
      );
    }
  }

}
