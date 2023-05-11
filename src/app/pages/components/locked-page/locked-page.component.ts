import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-locked-page',
  templateUrl: './locked-page.component.html'
})
export class LockedPageComponent {
  constructor(private coreService: CoreService){}

  goToDashboard(){
    this.coreService.goToDashboard();
  }
}
