import { Component, OnInit } from '@angular/core';
import { AddDontationTypeModel } from '../../models/donation-type.model';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-modal-add-donation-type',
  templateUrl: './modal-add-donation-type.component.html'
})
export class ModalAddDonationTypeComponent implements OnInit{
  donationTypeForm!: AddDontationTypeModel;
  chekcboxValue: boolean = false;

  isSubmitting: boolean = false;
  donationTypeExists: boolean = false;
  

  constructor(private donationService: DonationService){}

  ngOnInit(): void {
    this.donationTypeForm = {
      libelle: "",
      montant: null,
      montant_est_fixe: 0
    }
  }

  /**
   * Send data to api to register
   * @date 6/6/2023 - 10:00:48 AM
   */
  onSubmit(){
    this.isSubmitting = true;
    this.donationTypeExists =false;
    this.donationTypeForm.montant_est_fixe = this.chekcboxValue ? 1 : 0;
    
    this.donationService.addDonationType(this.donationTypeForm).subscribe(
      (data) => {
        this.isSubmitting = false;
        
        if (data.success === true){
          this.donationTypeExists = false;
          location.reload();
        }else{
          this.donationTypeExists = true;
        }
      }
    );
  }

  /**
   * Reset amount value if checkbox is checked
   * @date 6/8/2023 - 9:57:07 AM
   *
   * @param {boolean} val
   */
  onAmountFixedCheked(val:boolean){
    this.donationTypeForm.montant = null;
  }

  /**
   * Return true if amount field is correct
   * @date 6/6/2023 - 10:00:27 AM
   *
   * @returns {boolean}
   */
  amountIsCorrect(){
    if(this.chekcboxValue === true && this.donationTypeForm.montant === null){
      return false;
    }
    else{
      return true;
    }
  }
}
