import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isActive!: string;
  
  constructor(private router: Router){}

  ngOnInit(){
    this.isActive = '';
  }

  isListe(){
    if (this.router.url.includes('liste')) {
      console.log('is Liste ok');
      this.isActive = 'disabled';
    }else{
      this.isActive = ''
    }
    
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
