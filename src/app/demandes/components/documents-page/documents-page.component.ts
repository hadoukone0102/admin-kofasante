import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { DocumentPage } from '../../models/demande.model';
import { Observable, map } from 'rxjs';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]

})
export class DocumentsPageComponent {
  good!:boolean;
  Settings$!: Observable<DocumentPage>;
  Setting!: DocumentPage;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<DocumentPage>;
  messeTest$!: Observable<DocumentPage>;

  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['DocumentsPageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }

}
