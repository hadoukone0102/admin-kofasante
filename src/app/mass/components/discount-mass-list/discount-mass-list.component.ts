import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DiscountElements, DiscountUpdate, discount, } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';

@Component({
  selector: 'app-discount-mass-list',
  templateUrl: './discount-mass-list.component.html',
  styleUrls: ['./discount-mass-list.component.css']
})
export class DiscountMassListComponent {
  discount!: discount;
  id!:number;
  discountUpdate!: DiscountUpdate;
  chekcboxValue!: boolean;

  constructor(
    private coreService: CoreService,
    private massService: MassService,
  ){}

  ngOnInit():void{
    this.massService.getDiscountMasslist().subscribe(
      (data)=>{
        this.discount = data;
        this.chekcboxValue = this.discount.active === 1? true : false;
        this.id = this.discount.id;

        this.discountUpdate={
          id:this.discount.id,
          libelle: this.discount.libelle,
          montant: this.discount.montant,
          active: this.discount.active
        }
      }
    )
  }

  onSubmit(){
    this.massService.updatePromotionStatus(this.discountUpdate, this.id).subscribe(
      (data) =>{
        // console.log("message: "+ data.status_message);
        
        if(data.status){
          this.coreService.gotToDiscountList();
        }
      }
    )
  }

  dataOfDiscount!:discountUpdate;
  enableOrDesableDiscount(){
    this.DiscountElements.active= !this.DiscountElements.active;
    console.log(this.DiscountElements.active);
    this.massService.updatePromotionStatus(this.DiscountElements.active).subscribe(
      (data)=>{
        this.dataOfDiscount = data
      },
      (Response)=>{
        console.log('status de promotion mis à jour', Response);
      },
    );

  }

  DiscountElements:discountUpdate ={
    libelle: this.dataOfDiscount.libelle,
    montant: this.dataOfDiscount.montant,
    active: this.dataOfDiscount.active,
  }


  desableDiscount(){
    this.DiscountElements.active=true;
  }
  goToAddDiscountmass(){this.coreService.gotToDiscount()}
  
  ActionOfDiscount(){
    
  }

}
