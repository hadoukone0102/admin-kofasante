import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataDon } from '../../models/don.model';
import { DonationService } from '../../services/donation.service';
import { DataAccumulation } from '../../models/accumulation.model';
import { lineTableAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-report-donation',
  templateUrl: './report-donation.component.html',
  animations:[
    zoomEnterAnimation
  ]
})
export class ReportDonationComponent implements OnInit{
  donations$!: Observable<DataDon>;
  accumulation!: DataAccumulation;
  type!: string;

  todayDate!:string;

  searchBarValue: string = "";
  dateStartValue: string = "";
  dateEndValue: string = "";

  constructor(
    private route: ActivatedRoute,
    private donationService: DonationService
    ) { }

  ngOnInit(): void {
    this.type = "all";
    this.donations$ = this.route.data.pipe(
      map(data => data['listAll']),
    );

    const now = new Date();
    this.todayDate = now.toISOString().substring(0, 10); 
    this.dateEndValue = this.todayDate;
    this.dateStartValue = this.todayDate;

    this.accumulation = {
      status : '',
      status_code : 0,
      status_message : '',
      total_dons : 0,
      cumul_prix_dons : 0,
      total_dons_anonymes : 0,
      cumul_prix_dons_anonymes : 0,
      total_dons_non_anonymes : 0,
      cumul_prix_dons_non_anonymes : 0,
      total_dons_non_anonymes_perso : 0,
      cumul_prix_dons_non_anonymes_perso : 0,
      total_dons_non_anonymes_orga : 0,
      cumul_prix_dons_non_anonymes_orga : 0
    }
  }

  showAnonymousList(){
    this.type = "anonymous";
    this.donations$ = this.donationService.getDonationsAnonymousWhere();
  }

  showNoAnonymousPersoList(){
    this.type = "noAnonymousPerso";
    this.donations$ = this.donationService.getDonationsNoAnonymousPersoWhere();
  }
  showNoAnonymousOrgaList(){
    this.type = "noAnonymousOrga";
    this.donations$ = this.donationService.getDonationsNoAnonymousOrgaWhere();
  }
  
  showAllDonationsList(){
    this.type = "all";
    this.donations$ = this.donationService.getDonationsWhere();
  }

  getAccumlationDonations(){
    this.donationService.getAccumulationDonations(this.searchBarValue, this.dateStartValue, this.dateEndValue)
    .subscribe(data => {
        this.accumulation = data;
      });
  }

  handleSearchBarValueFromChild(searchBarValue: string) {
    this.searchBarValue = searchBarValue;
    this.getAccumlationDonations();
  }
  handleDateStartValueFromChild(dateStartValue: string) {
    this.dateStartValue = dateStartValue;
    this.getAccumlationDonations();
  }
  handleDateEndValueFromChild(dateEndValue: string) {
    this.dateEndValue = dateEndValue;
    this.getAccumlationDonations();
  }


  
}
