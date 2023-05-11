import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataDon } from '../../models/don.model';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-report-donation',
  templateUrl: './report-donation.component.html',
})
export class ReportDonationComponent implements OnInit{
  donations$!: Observable<DataDon>;
  type!: string;

  constructor(
    private route: ActivatedRoute,
    private donationService: DonationService
    ) { }

  ngOnInit(): void {
    this.type = "all";
    this.donations$ = this.route.data.pipe(
      map(data => data['listAll']),
    );
  }

  showAnonymousList(){
    this.type = "anonymous";
    this.donations$ = this.donationService.getDonationsAnonymous();
  }

  showNoAnonymousPersoList(){
    this.type = "noAnonymousPerso";
    this.donations$ = this.donationService.getDonationsNoAnonymousPerso();
  }
  showNoAnonymousOrgaList(){
    this.type = "noAnonymousOrga";
    this.donations$ = this.donationService.getDonationsNoAnonymousOrga();
  }
  showAllDonationsList(){
    this.type = "all";
    this.donations$ = this.donationService.getDonations();
  }
}
