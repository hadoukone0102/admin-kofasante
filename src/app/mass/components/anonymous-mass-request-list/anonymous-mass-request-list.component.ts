import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildMassRequest, MassRequest } from '../mass-request-models/mass-request.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-anonymous-mass-request-list',
  templateUrl: './anonymous-mass-request-list.component.html'
})
export class AnonymousMassRequestListComponent {
  messe$!: Observable<MassRequest>;
  type!: string;
  maxDate!: string;
  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.type="anonymous"
    this.messe$ = this.route.data.pipe(
      map(data =>data['massAnonymousRequestResolver']),
    );

    this.messe$.subscribe(
      (data) => {
        if (data) {
          this.maxDate = this.getMaxDate(data.demande_messe);
        }
      }
    );
  }

  getMaxDate(data: ChildMassRequest[]){
    let maxDate: any = null;
    // Parcourez les données pour trouver la date maximale
    data.forEach((row) => {
        row.masses.forEach((mass) =>{
          const currentDate = new Date(mass.masses_days);
          if (maxDate === null || currentDate > maxDate) {
            maxDate = currentDate;
          }
        })
      });
      
      try {
        return maxDate!.toISOString().substring(0, 10);
      } catch (error) {
        return null;
      }
    }
}
