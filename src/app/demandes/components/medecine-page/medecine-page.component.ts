import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Medecine } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-medecine-page',
  templateUrl: './medecine-page.component.html',
  styleUrls: ['./medecine-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class MedecinePageComponent {
  good!:boolean;
  Settings$!: Observable<Medecine>;
  Setting!: Medecine;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<Medecine>;
  messeTest$!: Observable<Medecine>;

  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['MedecinePageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }
}
