import { Component } from '@angular/core';
import { RenseignerPage } from '../../models/demande.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-renseigner-page',
  templateUrl: './renseigner-page.component.html',
  styleUrls: ['./renseigner-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class RenseignerPageComponent {
  good!:boolean;
  Settings$!: Observable<RenseignerPage>;
  Setting!: RenseignerPage;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<RenseignerPage>;
  messeTest$!: Observable<RenseignerPage>;

  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['RenseignerPageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }
}
