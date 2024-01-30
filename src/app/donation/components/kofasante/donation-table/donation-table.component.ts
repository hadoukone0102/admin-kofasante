import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, takeWhile } from 'rxjs';
import { DataDon, Don, KofaUser, Rappel } from '../../../models/don.model';
import { DonationService } from '../../../services/donation.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { linePaginateAnimation,  } from 'src/app/core/animations/animations';
import { DataFilter } from 'src/app/core/models/filter-model';
import { FormDonationColumn } from '../../../models/form-donation-column.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  animations:[
    linePaginateAnimation
  ]

})
export class DonationTableComponent implements OnInit{

  // ~~~~~~~~~~ Decorated variables ~~~~~~~~~ //
  @Input() donationListParent!: KofaUser;
  dataElement!:any
  good!:boolean;
  Rappel!:Rappel;
  constructor(
    private donationService: DonationService,
    ) {}

  ngOnInit(): void {
    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
    }

    this.Rappel={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      titre:'',
      minutes: 30,
      heure: 8,
      jour:0
    }
  }

  resetFilter(){
    location.reload();
  }

  checkElements(data:any){
    this.dataElement ={
      id:data.id,
      nom:data.nom,
      prenom:data.prenom,
      contact:data.contact,
      email:data.email,
    }
  }
  message!:string;
  onSubmit(){
    this.good = true;
    this.Rappel.nom =this.dataElement.nom,
    this.Rappel.prenom =this.dataElement.prenom,
    this.Rappel.contact =this.dataElement.contact,
    this.Rappel.email =this.dataElement.email,
    console.log(this.Rappel);
    this.donationService.SendRappelForKofaUser(this.Rappel).subscribe(
      (data)=>{
          this.message = data.message;
        this.good = false;
      },(Error)=>{
        console.log(Error);
      }
    )
  }
}
