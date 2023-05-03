import { Component, OnInit } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { DataDonationInfo } from '../../models/donationInfo.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit{
  donations$!: Observable<DataDonationInfo>;
  donationInfo!: DataDonationInfo;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("dahs")
    this.donations$ = this.route.data.pipe(
      map(data => data['dashboard']),
      tap((response) => console.log("mapi dzsh")
      ),
    );

    this.donations$.subscribe((data) => this.donationInfo = data);
    console.log(this.donationInfo);
  }
}
