import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { MassService } from '../../services/mass.service';
import { DiscountUpdate, discount } from '../../models/mass.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-add-mass-discount',
  templateUrl: './add-mass-discount.component.html',
  styleUrls: ['./add-mass-discount.component.css']
})
export class AddMassDiscountComponent {
  result!:discount;
  result1!:discount;
  trentaine!:discount;
  changeDiscount!:DiscountUpdate;
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

    // this.route.data.pipe(map(data => data['discountListResolver']))
    // .subscribe( (data) => { 
    //     this.result1 = data;
    //     console.log(this.result);

    //     this.changeDiscountQuoti={
    //       libelle:this.result1.libelle,
    //       montant:this.result1.montant,
    //       active:this.result1.active
    //     }
    //   }
    // );

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
    this.massService.updatePromotionNeuvStatus(this.changeDiscountNeuv).subscribe(
      (Response)=>{
        console.log("meci S",Response);
      },
      (Error)=>{
        console.log("tu dois chercher encore", Error);
      }
    )
  }

  onSubmit3(){
    this.massService.updatePromotionTrenStatus(this.changeDiscountTren).subscribe(
      (Response)=>{
        console.log("meci S",Response);
      },
      (Error)=>{
        console.log("tu dois chercher encore", Error);
      }
    )
  }

  onSubmit1(){
    this.massService.updatePromotionStatus(this.changeDiscountQuoti).subscribe(
      (Response)=>{
        console.log("meci S",Response);
      },
      (Error)=>{
        console.log("tu dois chercher encore", Error);
      }
    )
}

}
