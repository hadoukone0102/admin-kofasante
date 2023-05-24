import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-basket-donation',
  templateUrl: './list-basket-donation.component.html',
  styleUrls: ['./list-basket-donation.component.css']
})
export class ListBasketDonationComponent {
  donations$!: Observable<DataDon>;

  constructor( private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.donations$ = this.route.data.pipe(
        map(data => data['listBasketDonation']),
      );
      
    }
}
