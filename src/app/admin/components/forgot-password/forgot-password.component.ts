import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
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
  }

  goToLogin(){
    this.coreService.goToLogin();
  }  

  onSubmit(){
    this.contactToSend.contactAdmin = this.countryCode + this.contact;
    console.log("mon contact: "+this.contactToSend.contactAdmin);
    
    this.authService.sendSMS(this.contactToSend).pipe(
      tap((data) => {
        console.log("le succes: "+ data.success);
        if(data.success){
          
          sessionStorage.setItem('contactReset', this.contactToSend.contactAdmin);
          this.coreService.goToConfirmCodeSms();

        }else{
          console.log("Erreur de sms");
        }
      }),
     
    ).subscribe();
  }

}
