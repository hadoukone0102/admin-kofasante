import { Component, ContentChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  constructor(private router: Router){}

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  goToDonation(){
    this.router.navigate(['/dons/liste']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToAdmin(){
    this.router.navigate(['/admin/liste']);
  }

  goToAddAdmin(){
    this.router.navigate(['/admin/ajouter']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

}
