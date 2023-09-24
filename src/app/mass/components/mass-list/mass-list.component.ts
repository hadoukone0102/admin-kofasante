import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MassDayData, MassModel } from '../../models/mass.model';

@Component({
  selector: 'app-list-mass',
  templateUrl: './mass-list.component.html'
})
export class MassListComponent implements OnInit{

  massModel!: MassModel;

  constructor(
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.route.data.pipe(map(data => data['listMassResolvers']))
    .subscribe( (data) => {
        this.massModel = data;
      }
    );
  }
}