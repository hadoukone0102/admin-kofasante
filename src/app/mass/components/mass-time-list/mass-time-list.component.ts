import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { MassTimeData } from '../../models/mass-time.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-mass-time-list',
  templateUrl: './mass-time-list.component.html',
  animations:[
    lineTableAnimation
  ]
})
export class MassTimeListComponent implements OnInit{
  massTimeList!: Array<MassTimeData>;

  constructor(
    private coreService: CoreService,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {

    this.route.data.pipe(map(data => data['listMassTimeResolver']))
    .subscribe( (data) => {
        this.massTimeList = data.time;
      }
    );
  }

  goToEditMassTime(id: number){
    this.coreService.goToEditMassTime();
  }

  deleteMassTime(id: number){

  }

  trackByMassTimeId(index: number, data: any): number {
    return data.id; // Remplacez "id" par la propriété unique de votre administrateur
  }
}
