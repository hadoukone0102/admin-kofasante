import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, takeWhile } from 'rxjs';
import { DataDon, Don, KofaUser } from '../../../models/don.model';
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

  constructor(
    private donationService: DonationService,
    ) {}

  ngOnInit(): void {
    //console.log(this.donationListParent);
  }

  resetFilter(){
    location.reload();
  }

}
