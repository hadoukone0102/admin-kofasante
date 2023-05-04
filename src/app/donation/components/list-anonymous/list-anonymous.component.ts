import { Component, OnInit } from '@angular/core';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-list-anonymous',
  templateUrl: './list-anonymous.component.html',
})
export class ListAnonymousComponent implements OnInit{
  donations$!: Observable<DataDon>;

  constructor(
    private route: ActivatedRoute,
    private notifService: NotificationService
    ) { }

  ngOnInit(): void {
    console.log("Dans le ini anonmous");
    this.notifService.updateDonationsAnoSeen().subscribe(
      (response) => console.log("C'est dans la boite INIT: "+response),
      (error) => console.error('Une erreur est survenue INIT: ', error)
    );
    
    this.donations$ = this.route.data.pipe(
      map(data => data['listAnonymous']),
    );
    
  }
}
