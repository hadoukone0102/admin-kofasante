
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
// import myModule from '../../../../assets/js/mod'

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

  // ~~~~~~~~~~~~~~~ Spinner ~~~~~~~~~~~~~~~ //
  isSubmitting!:  boolean;

  title!: string;//tel input

  // ~~~~~~~~~ Show hidden password ~~~~~~~~ //
  passwordTest!: string;
  showPassword: boolean = false;

  code!: string;

  inputTel!: HTMLInputElement;
  iti!: intlTelInput.Plugin;


  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
    // const inputElement = document.querySelector('input[type="tel"]') as HTMLInputElement;
    this.inputTel = document.querySelector('input[type="tel"]') as HTMLInputElement;
    if (this.inputTel) {
      this.iti = intlTelInput(this.inputTel, {
        initialCountry: 'CI',
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.5/js/utils.js'
      });
      
      this.inputTel.addEventListener('input', () => {
        this.dataLogin.contactAdmin = this.iti.getNumber();
        // const dialCode = iti.getSelectedCountryData().dialCode;
        // const isValid = iti.isValidNumber();

        console.log('Numéro de téléphone :',  this.dataLogin.contactAdmin);
        // console.log('change Indicatif du pays :', dialCode);
        // console.log('change is valid :', isValid);
      });
      this.inputTel.addEventListener('click', () => {
        this.dataLogin.contactAdmin = this.iti.getNumber();
        // const dialCode = iti.getSelectedCountryData().dialCode;
        // const isValid = iti.isValidNumber();

        console.log('click Numéro de téléphone :',  this.dataLogin.contactAdmin);
        // console.log('change Indicatif du pays :', dialCode);
        // console.log('change is valid :', isValid);
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
    this.siteKey = environment.captchaKeyDev;
    this.theme ="light"
    this.tokenCaptcha = null;
}

showConsole(val: string){
  
  console.log("keyup the new mama: "+val);
  
}
showConsoleChange(val: string){
  
  // console.log("change the new mama: "+val);
  
}

/**
 * Toogle password visibility
 * @date 5/22/2023 - 6:59:19 PM
 */
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

  /**
   * Get the reponse of captcha
   * @date 5/22/2023 - 6:59:56 PM
   *
   * @param {string} [$response=""]
   */
  getResponse($response: string =  ""){
    this.tokenCaptcha = $response;
  }

  /**
   * Called when captcha is expired
   * @date 5/22/2023 - 7:00:29 PM
   */
  handleExpire(){
    this.tokenCaptcha = null;
  }

  /**
   * Send data to api for auhentication
   * @date 5/22/2023 - 7:01:02 PM
   */
  onSubmit(){
    this.isSubmitting =true;
    this.isLogged = true;
    this.dataLogin.contactAdmin = this.iti.getNumber();
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

  }

  goToForgotPassowrd(){
    this.coreService.goToForgotPassowrd();
  }
}
