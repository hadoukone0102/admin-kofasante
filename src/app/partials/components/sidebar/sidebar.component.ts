import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PartialsService } from '../../partials.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(
    private router: Router, 
    private partialsService: PartialsService
    ){}

  goToDashboard(){
    this.partialsService.goToDashboard();
  }

  goToDonation(){
    this.partialsService.goToDonation();
  }

  goToProfile(){
    this.partialsService.goToProfile();
  }

  goToAdmin(){
    this.partialsService.goToAdmin();
  }

  goToAddAdmin(){
    this.partialsService.goToAddAdmin();
  }

  goToLogin(){
    this.partialsService.goToLogin();
  }

}
