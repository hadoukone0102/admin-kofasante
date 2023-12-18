import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { AddDontationTypeModel, DonationTypeData } from '../../models/donation-type.model';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-modal-form-donation-type',
  templateUrl: './modal-form-donation-type.component.html'
})
export class ModalFormDonationTypeComponent implements OnInit, OnChanges{
  @Input() formType!: "add" | "edit";
  @Input() donationTypeData!: DonationTypeData;

  donationTypeForm!: AddDontationTypeModel;

  isSubmitting: boolean = false;
  donationTypeExists: boolean = false;


  constructor(private donationService: DonationService){}

  ngOnInit(): void {
    this.donationTypeForm = {
      libelle: this.donationTypeData.libelle,
      montant: this.donationTypeData.montant,
      montant_est_fixe: this.donationTypeData.montant_est_fixe
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['donationTypeData']) {
      console.log("bulbulite");
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    this.donationTypeExists =false;

    this.donationService.addDonationType(this.donationTypeForm).subscribe(
      (data) => {
        this.isSubmitting = false;

        if (data.success === true){
          this.donationTypeExists = false;
          // this.coreService.goToAdmin();
        }else{
          this.donationTypeExists = true;
        }
      }
    );

  }
}
