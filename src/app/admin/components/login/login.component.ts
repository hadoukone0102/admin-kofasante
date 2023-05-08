
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreService } from 'src/app/core/services/core.service';
import { DataCountry } from '../../models/country-code.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit{
  contact!: string;
  password!: string;

  contactIsEmpty!: boolean;
  passwordIsEmpty!: boolean;

  countries$!: Observable<DataCountry>;
  countries!: DataCountry;
  

  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService){}

  ngOnInit(): void {
    this.contact = '';
    this.password = '';
    this.contactIsEmpty = false;
    this.passwordIsEmpty = false;

    this.countries$ = this.route.data.pipe(
      map(data => data['countryCode'])
    );
    console.log('djouma code contry');
      
    console.log(this.countries$);
    this.countries$.subscribe(data => this.countries = data)
    console.table(this.countries.pays);
    
  }
  onSubmit(){
    console.log(this.contact);

    this.coreService.goToDashboard();
    
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

  login(){
    
  }

  logout(){
    
  }

  goToForgotPassowrd(){
    this.coreService.goToForgotPassowrd();
  }  
}
