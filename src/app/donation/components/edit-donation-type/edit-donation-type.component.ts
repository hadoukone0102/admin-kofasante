import { Component, OnInit } from '@angular/core';
import { AddDontationTypeModel, DonationTypeByIdModel } from '../../models/donation-type.model';
import { CoreService } from 'src/app/core/services/core.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-edit-donation-type',
  templateUrl: './edit-donation-type.component.html'
})
export class EditDonationTypeComponent implements OnInit{
  donationTypeByIdModel!: DonationTypeByIdModel;

  id!: number;

  donationTypeForm!: AddDontationTypeModel;
  chekcboxValue!: boolean;

  isSubmitting: boolean = false;
  donationTypeExists: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private donationService: DonationService
  ){}

  ngOnInit(): void {
    
    this.route.data.pipe(
      map(data => data['donationTypeById'])
    ).subscribe(
      data => {
        this.donationTypeByIdModel = data;
        this.chekcboxValue = this.donationTypeByIdModel.type_don.montant_est_fixe === 1? true : false;
        this.id = this.donationTypeByIdModel.type_don.id;

        this.donationTypeForm = {
          libelle: this.donationTypeByIdModel.type_don.libelle,
          montant: this.donationTypeByIdModel.type_don.montant,
          montant_est_fixe: this.donationTypeByIdModel.type_don.montant_est_fixe
        }
      }
    );

  }

  onSubmit(){
    this.isSubmitting = true;
    this.donationTypeExists = false;
    if(this.chekcboxValue){
      this.donationTypeForm.montant_est_fixe = 1;
    }
    else{
      this.donationTypeForm.montant_est_fixe = 0;
      this.donationTypeForm.montant = null;
    }

    this.donationService.updateDonationType(this.donationTypeForm, this.id).subscribe(
      (data) =>{
        // console.log("message: "+ data.status_message);
        
        if(data.success){
          this.isSubmitting = false;
          this.coreService.goToListDonationType();
        }
        else{
          this.donationTypeExists =true;
          this.isSubmitting = false;
        }
      }
    )
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
