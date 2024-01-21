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
   // data for modal
   dataElement!:any
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


    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      rdv:'',
      dateRdv:'',
      typeServices:'',
      consultVar:'',
      couts:0,
      details:''
    }
  }

  checkAndApplyDisabled(data: Medecine){
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

    this.AnnonceService.getMedecinePagination(this.newPage.toString()).subscribe((data) => {
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
        consultant:data.consultant,
        tyeConsultation:data.tyeConsultation,
        dateTot:data.dateTot,
        dateTard:data.dateTard,
        couts:data.couts,
        details:data.details
      }
    }

    onSubmit(){}

}
