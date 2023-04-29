import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../../core.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isActive!: string;
  
  constructor(
    private router: Router,
    private coreService: CoreService
    ){}

  ngOnInit(){
    this.isActive = '';
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
