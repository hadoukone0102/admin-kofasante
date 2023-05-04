import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { DataDonationInfo } from '../../models/donationInfo.model';
import { ActivatedRoute } from '@angular/router';
import { DataAdminInfo } from '../../models/admin-info.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  donationInfo$!: Observable<DataDonationInfo>;
  donationInfo!: DataDonationInfo;

  adminInfo$!: Observable<DataAdminInfo>;
  adminInfo!: DataAdminInfo;
  

  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("dahs");
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
