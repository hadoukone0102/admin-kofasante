import { Component, Input, NgIterable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DiscountElements, DiscountUpdate, discount, } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discount-mass-list',
  templateUrl: './discount-mass-list.component.html',
  styleUrls: ['./discount-mass-list.component.css']
})
export class DiscountMassListComponent {

  @Input() massDiscount!:discount;
  @Input() massDiscountNeuvaine!:discount;

  @Input() massDiscountneuv!:Observable<discount>;
  @Input() massActive!: string;
  result!:discount;
  resultNeuvaine!:discount;
  changeDiscount!:DiscountUpdate;

  constructor(
    private coreService: CoreService,
    private massService: MassService,
  ){}

  ngOnInit(): void{

    this.result = this.massDiscount
    this.resultNeuvaine = this.massDiscountNeuvaine
    console.log(this.massDiscountNeuvaine);
    console.log(this.massDiscount);
    this.changeDiscount={
      libelle:this.result.libelle,
      montant:this.result.montant,
      active:this.result.active
    }

  }
  onSubmit(){
      this.massService.updatePromotionStatus(this.changeDiscount).subscribe(
        (Response)=>{
          console.log("meci S",Response);
        },
        (Error)=>{
          console.log("tu dois chercher encore", Error);
        }
      )
  }
  goToEditMass(id:number){
    this.coreService.goToEditDiscount(id);
  }
}