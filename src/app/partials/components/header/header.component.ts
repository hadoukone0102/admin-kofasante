import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PartialsService } from '../../partials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isActive!: string;
  
  constructor(
    private router: Router,
    private partialsService: PartialsService
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
    this.partialsService.goToProfile();
  }

  goToLogin(){
    this.partialsService.goToLogin();
  }
}
