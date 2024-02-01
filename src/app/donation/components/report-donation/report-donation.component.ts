import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Analysis, DataDon } from '../../models/don.model';
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
  donations$!: Observable<Analysis>;
  
  constructor(
    private route: ActivatedRoute,
    private donationService: DonationService
    ) { }

  ngOnInit(): void {

    this.donations$ = this.route.data.pipe(
      map(data => data['ListAllResolver']),
    );

  }




}
