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
  donationTypeData!: DonationTypeData;

  formType!: "add" | "edit";

  
  constructor(private coreService: CoreService){}

  ngOnInit(): void {
    this.donationTypeData = {
      id: null,
      libelle: "",
      montant: null,
      montant_est_fixe: null,
      created_at: "",
      updated_at: ""
    }
  }

  // Méthode trackBy pour identifier chaque administrateur par son id unique
  trackByDonationTypeId(index: number, donationType: any): number {
    return donationType.id; // Remplacez "id" par la propriété unique de votre administrateur
  }

  callAddModalFormFields(){
    this.callEditModalForm();
    this.formType = "add";
  }

  callEditModalForm(id: number|null = null, libelle: string = "", montant: number|null = null, montant_est_fixe: number|null = null): void {
    
    this.formType = "edit";
    this.donationTypeData.id = id;
    this.donationTypeData.libelle = libelle;
    this.donationTypeData.montant = montant;
    this.donationTypeData.montant_est_fixe = montant_est_fixe;
    console.log("edt: "+this.donationTypeData.montant_est_fixe);
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
  disabledDonationType(id: number|null){

  }

}
