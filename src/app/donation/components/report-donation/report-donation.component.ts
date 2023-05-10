import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';
import { DataDon } from '../../models/don.model';

@Component({
  selector: 'app-report-donation',
  templateUrl: './report-donation.component.html',
})
export class ReportDonationComponent implements OnInit{
  donations$!: Observable<DataDon>;

  constructor(
    private route: ActivatedRoute,
    private notifService: NotificationService
    ) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listAll']),
    );
    
  }

  showAnonymousList(){
    console.log("Dans le ini anonmous");
    this.notifService.updateDonationsAnoSeen().subscribe(
      (response) => console.log("C'est dans la boite INIT: "+response),
      (error) => console.error('Une erreur est survenue INIT: ', error)
    );
    
    this.donations$ = this.route.data.pipe(
      map(data => data['listAnonymous']),
    );
  }
  showNoAnonymousPersoList(){

  }
  showNoAnonymousOrgaList(){

  }
  showAllDonationsList(){

  }
}
