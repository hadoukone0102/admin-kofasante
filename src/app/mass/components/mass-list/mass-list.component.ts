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
  maxDate!: string;

  constructor(
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.route.data.pipe(map(data => data['listMassResolvers']))
    .subscribe( (data) => {
        this.massModel = data;
        this.getMaxDate();
      }
    );
  }

  getMaxDate(){
    let maxDate: Date | null = null;
    
        // Parcourez les données pour trouver la date maximale
        this.massModel.masses.forEach((massDayData) => {
            const currentDate = new Date(massDayData.days);
    
            if (maxDate === null || currentDate > maxDate) {
              maxDate = currentDate;
            }
          });
          this.maxDate = maxDate!.toISOString().substring(0, 10);
    }
}
