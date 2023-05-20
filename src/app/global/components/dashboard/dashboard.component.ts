import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDonationInfo } from '../../models/donationInfo.model';
import { ActivatedRoute } from '@angular/router';
import { DataAdminInfo } from '../../models/admin-info.model';
import { style, transition, trigger,animate } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  animations:[
    trigger('lineAnime', [
     
      transition(':enter', [
        style({
          transform: 'scale(0) ',
          opacity: 0,
            // 'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
          transform: 'scale(1) ',
          opacity: 1,
            // 'background-color': 'aqua',
        }))
    ]),
  ]),
  ]
})
export class DashboardComponent implements OnInit{
  donationInfo$!: Observable<DataDonationInfo>;
  donationInfo!: DataDonationInfo;

  adminInfo$!: Observable<DataAdminInfo>;
  adminInfo!: DataAdminInfo;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donationInfo$ = this.route.data.pipe(
      map(data => data['dashboard']),
    );
    
    this.donationInfo$.subscribe((data) => this.donationInfo = data);
    
    this.adminInfo$ = this.route.data.pipe(
      map(data => data['adminInfo']),
    );
    
    this.adminInfo$.subscribe((data) => this.adminInfo = data);

    

  }
}
