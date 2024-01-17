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

  checkAndApplyDisabled(data: DocumentPage){
    if (data) {
      //NOTE - "1" means that it should be disabled and "..." that it should be enabled
      if((data.data.current_page === 1) && (data.data.current_page != data.data.last_page)){
        //("1/...")
        this.isFirstPage = "disabled";
        this.isLastPage = "";
      }else{
        if((data.data.current_page === 1) && (data.data.current_page === data.data.last_page)){
          //("1/1")
          this.isFirstPage = "disabled";
          this.isLastPage = "disabled";
        }
        else{
          if((data.data.current_page != 1) && (data.data.current_page != data.data.last_page)){
            //(".../...")
            this.isFirstPage  = "";
            this.isLastPage = "";
          }
          else{
              //(".../1")
              this.isFirstPage  = "";
              this.isLastPage = "disabled";
          }
        }
      }
    }
  }


   /**
   * Go to previous page of table
   * @date
   */
   goToPrevious(){
    this.showPageWhere(-1);
  }

  /**
   * Go to next page of table
   * @date
   */
  goToNext(){
    this.showPageWhere(1);
  }

  /**
   * Get the data matching of the current page of pagination
   * @date
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.Setting.data.current_page + pageIndex;

    this.AnnonceService.getDocumentsPagination(this.newPage.toString()).subscribe((data) => {
      this.Setting = data;
      this.checkAndApplyDisabled(data);
    });

  }


}
