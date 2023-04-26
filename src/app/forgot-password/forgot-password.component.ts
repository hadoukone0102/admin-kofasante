import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  constructor(private router: Router){}

  goToLogin(){
    this.router.navigate(['/login']);
  }  
}