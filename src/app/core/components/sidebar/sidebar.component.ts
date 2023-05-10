import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { Observable, map } from 'rxjs';
import { DataDonationNotif } from '../../models/donation-notif.model';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from 'src/app/admin/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit{
  donationNotif$!: Observable<DataDonationNotif>;
  donationNotif!: DataDonationNotif;

  adminFirstName!: string|null;
  adminLastName!: string|null;

  
  constructor(
    private route: ActivatedRoute,
    private coreService: CoreService,
    private notifService: NotificationService,
    private authService: AuthService,
    ){}

  ngOnInit(): void {
    this.donationNotif$ = this.route.data.pipe(
      map(data => data['donationNotif']),
    );
    // this.notifService.getNoSeenDonations().subscribe((data) => this.donationNotif = data); 
    this.donationNotif$.subscribe((data) => this.donationNotif = data);

    this.adminFirstName = sessionStorage.getItem('firstName');
    this.adminLastName = sessionStorage.getItem('lastName');
    
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

  logout(){
    this.authService.logout();
  }

}
