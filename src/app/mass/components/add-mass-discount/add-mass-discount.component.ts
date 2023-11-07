import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { MassService } from '../../services/mass.service';
import { DiscountUpdate, discount } from '../../models/mass.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-add-mass-discount',
  templateUrl: './add-mass-discount.component.html',
  styleUrls: ['./add-mass-discount.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class AddMassDiscountComponent {
  result!:discount;
  result1!:discount;
  trentaine!:discount;
  isSubmitting:boolean= false;
  // changeDiscount!:DiscountUpdate;
  changeDiscountQuoti!:DiscountUpdate;
  changeDiscountNeuv!:DiscountUpdate;
  changeDiscountTren!:DiscountUpdate;
  constructor(
    private coreService: CoreService,
    private massService: MassService,
    private route: ActivatedRoute,
  ){}

  ngOnInit(){
    this.massService.getDiscountList().subscribe(
      (data)=>{
        this.result1 = data;
        console.log(this.result);

        this.changeDiscountQuoti={
          libelle:this.result1.libelle,
          montant:this.result1.montant,
          active:this.result1.active
        }
      }
    );

    this.route.data.pipe(map(data => data['discountListResolver']))
    .subscribe( (data) => { 
      this.result1 = data;
      this.changeDiscountQuoti={
        libelle:this.result1.libelle,
        montant:this.result1.montant,
        active:this.result1.active
      }
      }
    );

    this.massService.getDiscountListNeuv().subscribe(
      (data)=>{
        this.result = data;
        console.log(this.result);

        this.changeDiscountNeuv={
          libelle:this.result.libelle,
          montant:this.result.montant,
          active:this.result.active
        }
      }
    );
      this.massService.getDiscountListTren().subscribe(
        (data)=>{
          this.trentaine = data;
          this.changeDiscountTren={
            libelle:this.trentaine.libelle,
            montant:this.trentaine.montant,
            active:this.trentaine.active
          }
        }
      )
  }

  onSubmit2(){
    this.isSubmitting = true;
    this.massService.updatePromotionNeuvStatus(this.changeDiscountNeuv).subscribe(
      (Response)=>{
        this.isSubmitting = false;
        console.log(Response);
      },
      (Error)=>{
        console.log(Error);
      }
    )
  }

  onSubmit3(){
    this.isSubmitting = true;
    this.massService.updatePromotionTrenStatus(this.changeDiscountTren).subscribe(
      (Response)=>{
        this.isSubmitting = false;
        console.log(Response);
      },
      (Error)=>{
        console.log(Error);
      }
    )
  }

  onSubmit1(){
    this.isSubmitting = true;
    this.massService.updatePromotionStatus(this.changeDiscountQuoti).subscribe(
      (Response)=>{
        this.isSubmitting = false;
        console.log(Response);
      },
      (Error)=>{
        console.log(Error);
      }
    )
}

resetFilter(){
  window.location.reload();
}

}
