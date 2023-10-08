import { Component, OnInit } from '@angular/core';
import { MassService } from '../../services/mass.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MassTimeByIdModel } from '../../models/mass-time.model';

@Component({
  selector: 'app-edit-mass-time',
  templateUrl: './edit-mass-time.component.html'
})
export class EditMassTimeComponent implements OnInit{
  massTimeByIdModel!: MassTimeByIdModel;


  constructor(private massService: MassService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.data.pipe(map(data => data['massTimeByIdResolvers']))
    .subscribe( (data) => {
        this.massTimeByIdModel = data;
      }
    );
    
  }

}
