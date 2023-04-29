
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  contact!: string;
  password!: string;

  constructor(private coreService: CoreService){}

  onSubmit(){

  }

  login(){

  }

  logout(){
    
  }

  goToForgotPassowrd(){
    this.coreService.goToForgotPassowrd();
  }  

}
