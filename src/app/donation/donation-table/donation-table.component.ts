import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html'
})
export class DonationTableComponent {
  isAnonymous!: boolean;
  isPersonal!: boolean;
  title!: string;
  activeAnonymous!: string;
  activeNoAnonymous!: string;

  constructor(private element: ElementRef) {}


  ngOnInit(): void {
    this.isAnonymous = false;
    this.title = "Dons non anonyme";
    this.activeAnonymous= "";
    this.activeNoAnonymous= "btn-primary";
    this.isPersonal = true;
  }

  showAnonymous(){
    this.isAnonymous = true;
    this.title = "Dons anonyme";
    this.activeAnonymous= "btn-primary";
    this.activeNoAnonymous= "";
  }

  showNoAnonymous(){
    this.isAnonymous = false;
    this.title = "Dons non anonyme";
    this.activeAnonymous= "";
    this.activeNoAnonymous= "btn-primary";
  }

  togglePersonal(val: boolean){
    this.isPersonal = val;
  }

}
