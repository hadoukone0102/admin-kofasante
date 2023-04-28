
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  contact!: string;
  password!: string;

  constructor(private router: Router){}

  onSubmit(){

  }

  login(){

  }

  logout(){
    
  }

  goToForgotPassowrd(){
    this.router.navigate(['/mot-de-passe-oublie']);
  }  

}
