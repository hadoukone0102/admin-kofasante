import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toggle-header',
  templateUrl: './header-toggle.component.html'
})
export class HeaderToggleComponent {

  constructor(private router: Router){}

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }
  
}
