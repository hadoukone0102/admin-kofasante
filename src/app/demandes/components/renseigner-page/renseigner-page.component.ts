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
    // data for modal
    dataElement!:any

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

    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      couts:0,
      details:''
    }

  }

  checkAndApplyDisabled(data: RenseignerPage){
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

    this.AnnonceService.getrenseignerPagination(this.newPage.toString()).subscribe((data) => {
      this.Setting = data;
      this.checkAndApplyDisabled(data);
    });

  }


  // for madal page

  checkElements(data:any){
    this.dataElement ={
      nom:data.nom,
      prenom:data.prenom,
      contact:data.contact,
      email:data.email,
      rdv:data.rdv,
      dateRdv:data.dateRdv,
      typeServices:data.typeServices,
      consultVar:data.consultVar,
      couts:data.couts,
      details:data.details
    }

  }

  onSubmit(){}


}
