
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/services/core.service';
import { DataCountry } from '../../models/country-code.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Datalogin } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { DataResultLogin } from '../../models/result-login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
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
  

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
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
    console.log('djouma code contry');
      
    console.log(this.countries$);
    this.countries$.subscribe(data => this.countries = data);
    console.table(this.countries.pays);
    
  }
  
  onSubmit(){
    this.isLogged = true
    this.dataLogin.contactAdmin =  this.countryCode + this.contact;
    this.authService.login(this.dataLogin).subscribe(
      (data) => {
        console.log("Mon token: "+data.access_token);
        if(data.access_token && data.auth){
          sessionStorage.setItem('contact', data.administrateur.contactAdmin);
          sessionStorage.setItem('firstName', data.administrateur.nomAdmin);
          sessionStorage.setItem('lastName', data.administrateur.prenomAdmin);
          sessionStorage.setItem('type', data.administrateur.id_typeadmin);
          sessionStorage.setItem('token', data.access_token);

          this.coreService.goToDashboard();
        }else{
          console.log("pas d'authentification réussi");
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
