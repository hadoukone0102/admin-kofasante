
import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DataCountry } from '../../models/country-code.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Datalogin } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { DataResultLogin } from '../../models/result-login.model';
import * as intlTelInput from 'intl-tel-input';
import { environment } from 'src/environments/environment';

// declare function showConsole():any ;
// declare function checkout():any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  contact!: string;
  password!: string;
  countryCode!: string;

  dataLogin!: Datalogin;
  credentials!: DataResultLogin;

  contactIsEmpty!: boolean;
  passwordIsEmpty!: boolean;
  isLogged!: boolean;

  countries$!: Observable<DataCountry>;
  countries!: DataCountry;

  // ~~~~~~~~~~~~~~~ Captcha ~~~~~~~~~~~~~~~ //
  siteKey!: string;
  theme!: "dark" | "light";
  tokenCaptcha!: string|null;

  isSubmitting!:  boolean;

  title!: string;
  

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
    const inputElement = document.querySelector('input[type="tel"]');
    if(inputElement){
    intlTelInput(inputElement,{
      initialCountry:'CI',
      separateDialCode:true,
      utilsScript:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.5/js/utils.js'
    });
    }
    this.title = 'angularl10';
    this.isSubmitting = false;

    this.dataLogin={
      contactAdmin:"",
      mdpAdmin: "",
      remember: false
    }
    this.contact = '';
    this.password = '';
    this.contactIsEmpty = false;
    this.passwordIsEmpty = false;
    this.countryCode = '+225';
    this.isLogged = true;

    this.countries$ = this.route.data.pipe(
      map(data => data['countryCode'])
    );
    this.countries$.subscribe(data => this.countries = data);
    // ~~~~~~~~~~~~~~~ Captcha ~~~~~~~~~~~~~~~ //
    this.siteKey = environment.captchaKeyProd;
    this.theme ="light"
    this.tokenCaptcha = null;
    
}

  getResponse($response: string =  ""){
    this.tokenCaptcha = $response;
  }
  handleExpire(){
    this.tokenCaptcha = null;
  }
  
  onSubmit(){
    this.isSubmitting =true;
    this.isLogged = true;

    this.dataLogin.contactAdmin =  this.countryCode + this.contact;
    this.authService.login(this.dataLogin).subscribe(
      (data) => {
        if(data.access_token && data.auth){
          sessionStorage.setItem('contact', data.administrateur.contactAdmin);
          sessionStorage.setItem('firstName', data.administrateur.nomAdmin);
          sessionStorage.setItem('lastName', data.administrateur.prenomAdmin);
          sessionStorage.setItem('type', data.administrateur.id_typeadmin);
          sessionStorage.setItem('token', data.access_token);

          this.isSubmitting =false;
          this.coreService.goToDashboard();
        }else{
          this.isSubmitting = false;
          this.isLogged = false;
        }
      },
      (error) => console.log("Erreur: "+ error)
    );


  
    // this.coreService.goToDashboard();



    
    // if(this.contact === ""){
    //   this.contactIsEmpty = true;
    // }else{
    //   this.contactIsEmpty = false;
    // }
    // if(this.password === ""){
    //   this.passwordIsEmpty = true;
    // }else{
    //   this.passwordIsEmpty = false;
    // }
  }

  goToForgotPassowrd(){
    this.coreService.goToForgotPassowrd();
  }  
}
