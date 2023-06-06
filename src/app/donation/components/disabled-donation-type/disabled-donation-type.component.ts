import { Component, OnInit } from '@angular/core';
import { DonationTypeModel } from '../../models/donation-type.model';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-disabled-donation-type',
  templateUrl: './disabled-donation-type.component.html'
})
export class DisabledDonationTypeComponent implements OnInit{
  disabledDonationTypes$!: Observable<DonationTypeModel>;
  listType: "disabled" | "enabled" = "disabled";

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.disabledDonationTypes$ = this.route.data.pipe(
      map(data => data['disabledDonationType']),
    );
    

    console.log("donneee: "+this.disabledDonationTypes$);
  }

}
