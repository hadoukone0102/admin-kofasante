import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-donation-list',
  templateUrl: './donation-list.component.html'
})
export class DonationListComponent {
  donations$!: Observable<DataDon>;
  donations!: Observable<DataDon>|any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['donations'])
    );
    console.log(this.donations$);
    this.donations = this.donations$;
    
  }
}