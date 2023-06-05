import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DonationTypeData, DonationTypeModel } from '../../models/donation-type.model';
import { lineTableAnimation } from 'src/app/core/animations/animations';

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
  donationTypeData!: DonationTypeData[];
  
  constructor(private coreService: CoreService){}

  ngOnInit(): void {
    
  }

    // Méthode trackBy pour identifier chaque administrateur par son id unique
    trackByDonationTypeId(index: number, admin: any): number {
      return admin.id; // Remplacez "id" par la propriété unique de votre administrateur
    }

  /**
   * Go to the edition page for the specified donation type
   * @date 6/5/2023 - 4:32:50 PM
   */
  goToEditDonationType(id: number){
    this.coreService.goToEditDonationType();
  }

  /**
   * Desabled the specified donation type
   * @date 6/5/2023 - 4:32:11 PM
   */
  disabledDonationType(id: number){

  }

}
