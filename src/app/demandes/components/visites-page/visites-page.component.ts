import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Visites } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-visites-page',
  templateUrl: './visites-page.component.html',
  styleUrls: ['./visites-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class VisitesPageComponent {
  good!:boolean;
  Settings$!: Observable<Visites>;
  Setting!: Visites;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<Visites>;
  messeTest$!: Observable<Visites>;

  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['VisitesPageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }
}
