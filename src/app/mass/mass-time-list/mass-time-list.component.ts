import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-mass-time-list',
  templateUrl: './mass-time-list.component.html'
})
export class MassTimeListComponent {
  constructor(private coreService: CoreService){}

  goToEditMassTime(){
    this.coreService.goToEditMassTime();
  }
}
