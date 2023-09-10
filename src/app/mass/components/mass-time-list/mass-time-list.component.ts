import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { MassService } from '../../services/mass.service';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { MassTimeData } from '../../models/mass-time.model';

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
    private massService: MassService
    ){}

  ngOnInit(): void {
    this.massService.getTimesList().subscribe(
      (data) => {
        this.massTimeList = data.time;
      }
    )
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
