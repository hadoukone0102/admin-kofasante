import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AbonnementPage } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-abonnement-page',
  templateUrl: './abonnement-page.component.html',
  styleUrls: ['./abonnement-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class AbonnementPageComponent {
  good!:boolean;
  Settings$!: Observable<AbonnementPage>;
  Setting!: AbonnementPage;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<AbonnementPage>;
  messeTest$!: Observable<AbonnementPage>;

  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['AbonnementPageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }
}
