import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  constructor(private coreService: CoreService){}

  goToLogin(){
    this.coreService.goToLogin();
  }  

  sendSMS(contact: string){
    
  }
}
