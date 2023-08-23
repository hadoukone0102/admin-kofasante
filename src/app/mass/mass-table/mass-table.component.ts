import { Component } from '@angular/core';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-mass-table',
  templateUrl: './mass-table.component.html',
  animations:[
    lineTableAnimation,
  ]
})
export class MassTableComponent {

  constructor(private coreService: CoreService){}

  goToEditMass(){
    this.coreService.goToEditMass();
  }
}
