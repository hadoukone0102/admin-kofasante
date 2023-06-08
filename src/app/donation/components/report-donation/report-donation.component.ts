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
    //Get data from resolver
    this.donations$ = this.route.data.pipe(
      map(data => data['listAll']),
    );

    const now = new Date();
    this.todayDate = now.toISOString().substring(0, 10); 
    this.dateEndValue = this.todayDate;
    this.dateStartValue = this.todayDate;

    this.accumulation = {//initialization
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

  /**
   * Get anonymous donation list
   * @date 6/5/2023 - 1:45:03 PM
   */
  showAnonymousList(){
    this.type = "anonymous";
    this.donations$ = this.donationService.getDonationsAnonymousWhere();
  }

  /**
   * Get the list of non-anonymous donation made on a personal basis
   * @date 6/5/2023 - 1:46:28 PM
   */
  showNoAnonymousPersoList(){
    this.type = "noAnonymousPerso";
    this.donations$ = this.donationService.getDonationsNoAnonymousPersoWhere();
  }

  /**
   * Get the list of non-anonymous donation made by organisation
   * @date 6/5/2023 - 1:51:26 PM
   */
  showNoAnonymousOrgaList(){
    this.type = "noAnonymousOrga";
    this.donations$ = this.donationService.getDonationsNoAnonymousOrgaWhere();
  }
  
  /**
   * Get the list of all donation
   * @date 6/5/2023 - 1:52:28 PM
   */
  showAllDonationsList(){
    this.type = "all";
    this.donations$ = this.donationService.getDonationsWhere();
  }

  /**
   * Get the cumulative price and donations number for a periode
   * @date 6/5/2023 - 1:53:04 PM
   */
  getAccumlationDonations(){
    this.donationService.getAccumulationDonations(this.searchBarValue, this.dateStartValue, this.dateEndValue)
    .subscribe(data => {
        this.accumulation = data;
      });
  }

  /**
   * Get search bar value from child component(donationTableComponent)
   * @date 6/5/2023 - 1:54:13 PM
   *
   * @param {string} searchBarValue
   */
  handleSearchBarValueFromChild(searchBarValue: string) {
    this.searchBarValue = searchBarValue;
    this.getAccumlationDonations();
  }

  /**
   * Get value of date start field from child component(donationTableComponent)
   * @date 6/5/2023 - 1:56:18 PM
   *
   * @param {string} dateStartValue
   */
  handleDateStartValueFromChild(dateStartValue: string) {
    this.dateStartValue = dateStartValue;
    this.getAccumlationDonations();
  }

  /**
   * Get value of end date field from child component(donationTableComponent)
   * @date 6/5/2023 - 1:57:41 PM
   *
   * @param {string} dateEndValue
   */
  handleDateEndValueFromChild(dateEndValue: string) {
    this.dateEndValue = dateEndValue;
    this.getAccumlationDonations();
  }


  
}
