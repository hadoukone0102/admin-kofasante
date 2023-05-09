import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../services/core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isActive!: string;

  adminFirstName!: string|null;
  adminLastName!: string|null;
  
  constructor(
    private router: Router,
    private coreService: CoreService
    ){}

  ngOnInit(){
    this.isActive = '';

    this.adminFirstName = sessionStorage.getItem('firstName');
    this.adminLastName = sessionStorage.getItem('lastName');
  }

  isListe(){
    if (this.router.url.includes('liste')) {
      return true;
    }
    return false;
  }

  goToProfile(){
    this.coreService.goToProfile();
  }

  goToLogin(){
    this.coreService.goToLogin();
  }
}
