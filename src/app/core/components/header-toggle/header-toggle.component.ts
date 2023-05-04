import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-toggle-header',
  templateUrl: './header-toggle.component.html'
})
export class HeaderToggleComponent {

  constructor(private coreService: CoreService){}

  goToDashboard(){
    this.coreService.goToDashboard()
  }
  
}
