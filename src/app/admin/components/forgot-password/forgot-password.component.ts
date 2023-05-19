import { Component, OnInit } from '@angular/core';
import { Observable, finalize, map, takeWhile, tap } from 'rxjs';
import { CoreService } from 'src/app/core/services/core.service';
import { DataCountry } from '../../models/country-code.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataForgotPassword } from '../../models/forgot-password.model';
import { DataResultForgotPassword } from '../../models/result-forgot-password.model';

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
  }

  goToLogin(){
    this.coreService.goToLogin();
  }  

  onSubmit(){
    this.contactToSend.contactAdmin = this.countryCode + this.contact;
    
    this.authService.sendSMS(this.contactToSend).subscribe(
      (data) => {
        this.resultDataForgotPassword = data;
        if(data.success){
          sessionStorage.setItem('contactReset', this.contactToSend.contactAdmin);
          this.coreService.goToConfirmCodeSms();
        }else{
          this.contactExists = false;
        }
        }
    )
                       
  }
}
