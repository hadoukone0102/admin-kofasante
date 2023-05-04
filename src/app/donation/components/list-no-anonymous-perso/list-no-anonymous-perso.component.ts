import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-list-no-anonymous-perso',
  templateUrl: './list-no-anonymous-perso.component.html'
})
export class ListNoAnonymousPersoComponent {
  donations$!: Observable<DataDon>;

  constructor(
    private route: ActivatedRoute,
    private notifService: NotificationService
    ) { }

  ngOnInit(): void {
    this.notifService.updateDonationsNoAnoPersoSeen().subscribe(
      (response) => console.log("C'est dans la boite INIT: "+response),
      (error) => console.error('Une erreur est survenue INIT: ', error)
    );

    this.donations$ = this.route.data.pipe(
      map(data => data['listNoAnonymousPerso'])
    );
    console.log('mameee perso');
      
    console.log(this.donations$);
  }
}
