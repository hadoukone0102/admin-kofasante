import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Daum, LectureListe } from 'src/app/donation/models/don.model';
import { DonationService } from 'src/app/donation/services/donation.service';

@Component({
  selector: 'app-list-analyse',
  templateUrl: './list-analyse.component.html',
  styleUrls: ['./list-analyse.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class ListAnalyseComponent {


  good!:boolean;
  Settings$!: Observable<LectureListe>;
  Setting!: Array<Daum>;


  constructor(
    private factureService : DonationService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['ListAnalyseResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data.data;
        console.log(this.Setting);
      }
    );

  }

}
