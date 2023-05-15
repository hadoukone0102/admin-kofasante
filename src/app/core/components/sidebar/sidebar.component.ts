import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from '../../services/core.service';
import { Observable, map } from 'rxjs';
import { DataDonationNotif } from '../../models/donation-notif.model';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from 'src/app/admin/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['../../../../assets/css/print.css']
})
export class SidebarComponent implements OnInit{
  donationNotif$!: Observable<DataDonationNotif>;
  donationNotif!: DataDonationNotif;

  adminFirstName!: string|null;
  adminLastName!: string|null;
  adminType!: string|null;

  rolesForDonation!: string[];
  rolesForAdmin!: string[];
  
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
    this.adminType = sessionStorage.getItem('type');
    //roles initialisation
    this.rolesForDonation = environment.allRoles_Without_HeadOfCatechesis
    this.rolesForAdmin = ['Curé'];
  }

  isAuthorizedForDonation(): boolean{
    if(this.rolesForDonation.includes(this.adminType ?? '')){
      return true;
    }
    return false;
  }
  
  isAuthorizedForAdmin(){
    if(this.rolesForAdmin.includes(this.adminType ?? '')){
      return true;
    }
    return false;
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

  goToReportDonation(){
    this.coreService.goToReportDonation()
  }

  goToProfile(){
    this.coreService.goToProfile();
  }

  goToAdmin(){
    this.coreService.goToAdmin();
  }
 
  goToDisabledAccount(){
    this.coreService.goToDisabledAccount();
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
