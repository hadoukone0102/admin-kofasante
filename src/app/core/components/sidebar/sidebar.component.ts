import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

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

  goToDonationAnonymous(){
    this.coreService.goToDonationAnonymous();
  }

  goToDonationNoAnonymousPerso(){
    this.coreService.goToDonationNoAnonymousPerso();
  }
  
  goToDonationNoAnonymousOrga(){
    this.coreService.goToDonationNoAnonymousOrga();
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
