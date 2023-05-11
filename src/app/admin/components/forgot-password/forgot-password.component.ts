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

  isDataReceived!: boolean;
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
    this.isDataReceived = false;
  }

  goToLogin(){
    this.coreService.goToLogin();
  }  

  onSubmit(){
    this.contactToSend.contactAdmin = this.countryCode + this.contact;
    console.log("mon contact: "+this.contactToSend.contactAdmin);
    
    this.authService.sendSMS(this.contactToSend).pipe(
      finalize(() =>{
       console.log("j'affiche le data");
       console.log(this.resultDataForgotPassword.success);
       console.log("message data");
       console.log(this.resultDataForgotPassword.message);
      }),
      tap((data) => {
        this.resultDataForgotPassword = data;
        console.log("le success: "+ data.success);
        
        if(data.success === true || data.success === false){
          console.log("if susscess");
          this.isDataReceived = true;
          
          sessionStorage.setItem('contactReset', this.contactToSend.contactAdmin);
          this.coreService.goToConfirmCodeSms();

        }else{
          console.log("Erreur de sms");
        }
        }
      ),
      takeWhile(data => !data, true)
     
    ).subscribe(
      data => console.log("the new = "+ data.success)
    );
    // Vérifier si les données sont reçues toutes les 100 millisecondes
  // const checkDataInterval = setInterval(() => {
  //   console.log("dans le setinterval");
    
  //   if (this.resultDataForgotPassword.success === false || this.isDataReceived ===  true) {
  //     console.log("dans le clearinterval");
  //     clearInterval(checkDataInterval);
  //     // les données sont reçues, faire quelque chose ici
  //   }
  // }, 100);                    
  }


  // Vérifier si les données sont reçues toutes les 100 millisecondes
// const checkDataInterval = setInterval(() => {
//   if (this.isDataReceived) {
//     clearInterval(checkDataInterval);
    // les données sont reçues, faire quelque chose ici
//   }
// }, 100);

}
