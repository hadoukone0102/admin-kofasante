import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { lineTableAnimation } from 'src/app/core/animations/animations';
import { DeleteMassTimeModel, MassTimeData } from '../../models/mass-time.model';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MassService } from '../../services/mass.service';

@Component({
  selector: 'app-mass-time-list',
  templateUrl: './mass-time-list.component.html',
  animations:[
    lineTableAnimation
  ]
})
export class MassTimeListComponent implements OnInit{
  massTimeList!: Array<MassTimeData>;
  deleteMassTimeModel!: DeleteMassTimeModel;


  constructor(
    private coreService: CoreService,
    private route: ActivatedRoute,
    private massService: MassService
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
    this.deleteMassTimeModel.time_id.splice(0, this.deleteMassTimeModel.time_id.length)
    this.deleteMassTimeModel.time_id.push(id);
    // this.massService.deleteMassTime(this.deleteMassTimeModel).subscribe(
    //   (data) => {
    //     if (data.success) {
    //       console.log("good");
    //     }else{
    //       console.log("bad");
          
    //     }
    //   }
    // )
  }

  trackByMassTimeId(index: number, data: any): number {
    return data.id; // Remplacez "id" par la propriété unique de votre administrateur
  }
}
