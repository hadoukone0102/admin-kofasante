import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormDonationColumn } from '../../models/form-donation-column.model';

@Component({
  selector: 'app-modal-select-column',
  templateUrl: './modal-select-column.component.html',
  styleUrls: ['./modal-select-column.component.css']
})
export class ModalSelectColumnComponent implements OnInit{
  @Input() listType!: string;
  @Output() formDonationColumnToParent: EventEmitter<FormDonationColumn> = new EventEmitter<FormDonationColumn>();

  //Disable or enable checkbox depending list type
  isAnonymous!: boolean;
  isOrganisation!: boolean;

  formDonationColumn!: FormDonationColumn;

  ngOnInit(): void {
    this.enabledAndInitialiseColumnOfType(this.listType);
  }

  onSubmit(){
    this.formDonationColumnToParent.emit(this.formDonationColumn);
  }

  /**
   * Show Column matching donation type
   * @date 26/05/2023 - 10:53:42 AM
   *
   * @param {string} type
   */
  enabledAndInitialiseColumnOfType(type: string){
    if(type === "anonymous"){
      this.showAnonymous();
    }
    else if(type === "noAnonymousPerso"){
      this.showNoAnonymousPerso();
    }
    else{// all
      this.showAll();
    }
  }

  /**
   * Allows to display only columns for the list of anonymous donatitons
   * @date 5/17/2023 - 12:55:09 PM
   */
  showAnonymous(){
    this.isAnonymous = true;
    //Initialisation
    this.formDonationColumn = {
      number: true,
      montantDon: true,
      typeDon: true,
      organisationDon: false,
      civiliteDon: false,
      nomDon: false,
      prenomDon: false,
      contactDon: false,
      payeurDon: true,
      paysDon: false,
      villeDon: false,
      transactionId: true,
      dateDon: true,
      intention:true,
      templateER:false,
    }
  }

  /**
   * Allows to display only columns for the list of non-anonymous donatitons made 
   * on a personal basis
   * @date 5/17/2023 - 12:58:07 PM
   */
  showNoAnonymousPerso(){
    this.isAnonymous = false;
    this.isOrganisation = false;
    //Initialisation
    this.formDonationColumn = {
      number: true,
      montantDon: true,
      typeDon: true,
      organisationDon: false,
      civiliteDon: true,
      nomDon: true,
      prenomDon: true,
      contactDon: true,
      payeurDon: true,
      paysDon: true,
      villeDon: true,
      transactionId: true,
      dateDon: true,
      intention:true,
      templateER:false,
    }
  }

  /**
   * Allows to display only columns for the list of non-anonymous donatitons made by organizations
   * @date 5/17/2023 - 12:59:34 PM
   */
  showAll(){
    this.isAnonymous = false;
    this.isOrganisation = true;
    //Initialisation
    this.formDonationColumn = {
      number: true,
      montantDon: true,
      typeDon: true,
      organisationDon: true,
      civiliteDon: true,
      nomDon: true,
      prenomDon: true,
      contactDon: true,
      payeurDon: true,
      paysDon: true,
      villeDon: true,
      transactionId: true,
      dateDon: true,
      intention:true,
      templateER:false,
    }
  }
}
