
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  contact!: string;
  password!: string;

  contactIsEmpty!: boolean;
  passwordIsEmpty!: boolean;

  constructor(private coreService: CoreService){}

  ngOnInit(): void {
    this.contact = '';
    this.password = '';
    this.contactIsEmpty = false;
    this.passwordIsEmpty = false;
  }
  onSubmit(){
    console.log(this.contact);
    
    if(this.contact === ""){
      this.contactIsEmpty = true;
    }else{
      this.contactIsEmpty = false;
    }
    if(this.password === ""){
      this.passwordIsEmpty = true;
    }else{
      this.passwordIsEmpty = false;
    }
  }

  login(){
    
  }

  logout(){
    
  }

  goToForgotPassowrd(){
    this.coreService.goToForgotPassowrd();
  }  

}
