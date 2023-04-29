import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(
    private router: Router, 
    private coreService: CoreService
    ){}

  goToDashboard(){
    this.coreService.goToDashboard();
  }

  goToDonation(){
    this.coreService.goToDonation();
  }

  goToProfile(){
    this.coreService.goToProfile();
  }

  goToAdmin(){
    this.coreService.goToAdmin();
  }

  goToAddAdmin(){
    this.coreService.goToAddAdmin();
  }

  goToLogin(){
    this.coreService.goToLogin();
  }

}
