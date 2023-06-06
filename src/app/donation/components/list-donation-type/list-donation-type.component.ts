import { Component, OnInit } from '@angular/core';
import { DonationTypeModel } from '../../models/donation-type.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-list-donation-type',
  templateUrl: './list-donation-type.component.html',
  styleUrls: ['./list-donation-type.component.css']
})
export class ListDonationTypeComponent implements OnInit{
  donationTypes$!: Observable<DonationTypeModel>;
  listType: "disabled" | "enabled" = "enabled";

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.donationTypes$ = this.route.data.pipe(
      map(data => data['listDonationType']),
    );
  }

  
}
