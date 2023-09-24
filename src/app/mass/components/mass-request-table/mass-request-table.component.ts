import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-mass-request-table',
  templateUrl: './mass-request-table.component.html'
})
export class MassRequestTableComponent {
  constructor(private coreService: CoreService){}

  goToEditMass(){
    // this.coreService.goToEditMass();
  }
}
