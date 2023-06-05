import { Component, OnInit } from '@angular/core';
import { Observable, finalize, map, takeWhile, tap } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { DataCountry } from '../../models/country-code.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataForgotPassword } from '../../models/forgot-password.model';
import { DataResultForgotPassword } from '../../models/result-forgot-password.model';
import * as intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit{
  countries$!: Observable<DataCountry>;
  countries!: DataCountry;

  contactIsEmpty!: boolean;
  contact!: String;
  contactToSend!: DataForgotPassword;
  countryCode!: string;

  contactExists!: boolean;
  resultDataForgotPassword!: DataResultForgotPassword;
  isSubmitting!: boolean;

  // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
  inputTel!: HTMLInputElement;
  iti!: intlTelInput.Plugin;

  constructor(
    private coreService: CoreService,
    private authService: AuthService,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    this.countries$ = this.route.data.pipe(
      map(data => data['countryCode'])
    );
    this.contactToSend = {
      contactAdmin : ""
    }

    this.countries$.subscribe(data => this.countries = data)
    this.countryCode = '+225';
    this.contact ="";
    this.contactExists = true;
    this.isSubmitting = false;

    // ~~~~~~~~~~~~~~ Tel input ~~~~~~~~~~~~~~ //
    // const inputElement = document.querySelector('input[type="tel"]') as HTMLInputElement;
    this.inputTel = document.querySelector('input[type="tel2"]') as HTMLInputElement;
    if (this.inputTel) {
      this.iti = intlTelInput(this.inputTel, {
        initialCountry: 'CI',
        separateDialCode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.1.5/js/utils.js'
      });
    }
  }

  goToLogin(){
    this.coreService.goToLogin();
  }  

  onSubmit(){
    this.isSubmitting =true;
    this.contactToSend.contactAdmin = this.iti.getNumber();
    
    this.authService.sendSMS(this.contactToSend).subscribe(
      (data) => {
        this.resultDataForgotPassword = data;
        if(data.success){
          sessionStorage.setItem('contactReset', this.contactToSend.contactAdmin);
          this.isSubmitting =false;
          this.coreService.goToConfirmCodeSms();
        }else{
          this.isSubmitting =false;
          this.contactExists = false;
        }
        }
    )
                       
  }
}
