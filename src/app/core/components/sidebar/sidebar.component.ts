import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { Observable, map } from 'rxjs';
import { DataDonationNotif } from '../../models/donation-notif.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
  donationNotif$!: Observable<DataDonationNotif>;
  donationNotif!: DataDonationNotif;

  // adminNotif$!: Observable<DataAdminNotif>;
  // adminNotif!: DataAdminNotif;
  
  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    ){}

  ngOnInit(): void {
    this.donationNotif$ = this.route.data.pipe(
      map(data => data['donationNotif']),
    );
    this.donationNotif$.subscribe((data) => this.donationNotif = data);

    // this.adminNotif$ = this.route.data.pipe(
    //   map(data => data['adminNotif']),
    // );
    // this.adminNotif$.subscribe((data) => this.adminNotif = data);
  }

  goToDashboard(){
    this.coreService.goToDashboard();
  }

  goToDonationAnonymous(){
    this.coreService.goToDonationAnonymous();
  }

  goToDonationNoAnonymousPerso(){
    this.coreService.goToDonationNoAnonymousPerso();
  }
  
  goToDonationNoAnonymousOrga(){
    this.coreService.goToDonationNoAnonymousOrga();
  }

  goToProfile(){
    this.coreService.goToProfile();
  }

  goToAdmin(){
    this.coreService.goToAdmin();
  }

  goToAddAdmin(){
    this.coreService.goToAddAdmin();
  }

  goToLogin(){
    this.coreService.goToLogin();
  }

}
