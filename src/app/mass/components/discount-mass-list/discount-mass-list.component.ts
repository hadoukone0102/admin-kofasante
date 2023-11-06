import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-discount-mass-list',
  templateUrl: './discount-mass-list.component.html',
  styleUrls: ['./discount-mass-list.component.css']
})
export class DiscountMassListComponent {
  constructor(
    private coreService: CoreService,
  ){}

  goToAddDiscountmass(){this.coreService.gotToDiscount()}
}
