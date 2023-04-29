import { Component } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html'
})
export class DonationListComponent {
  donations$!: Observable<DataDon>;
  donationsNoAnoPerso$!: Observable<DataDon>;
  donationsNoAnoOrga$!: Observable<DataDon>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['donations'])
    );
    this.donationsNoAnoPerso$ = this.route.data.pipe(
      map(data => data['donationNoAnonymousPerso'])
    );
    this.donationsNoAnoOrga$ = this.route.data.pipe(
      map(data => data['donationNoAnonymousOrga'])
    );
    // console.log("Ma liste Orga");
    // this.donationsNoAnoOrga$.subscribe(data => console.log(data));
  }

}
