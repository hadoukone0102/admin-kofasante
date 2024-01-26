import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Visites } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { VisiteFacture, update } from 'src/app/facturation/models/facture.model';

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
   // data for modal
   dataElement!:any
   VisiteFacture!:VisiteFacture;
   montants!:any;
   update!:update;
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

    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      services:'',
      typeServices:'',
      couts:0,
      details:''
    }

    this.VisiteFacture ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      type:'visite',
      services:'',
      typeServices:'',
      couts:0,
      details:'',
      status:false,
    }

    this.montants ={
      couts:0
    }

    this.update={
      status:false
    }

  }

  checkAndApplyDisabled(data: Visites){
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

    this.AnnonceService.getVisitePagination(this.newPage.toString()).subscribe((data) => {
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
      services:data.services,
      typeServices:data.typeServices,
      couts:data.couts,
      details:data.details
    }

    this.VisiteFacture ={
      nom:this.dataElement.nom,
      prenom:this.dataElement.prenom,
      contact:this.dataElement.contact,
      email:this.dataElement.email,
      type:'visite',
      status:false,
      services:this.dataElement.services,
      typeServices:this.dataElement.typeServices,
      couts:this.dataElement.couts,
      details:this.dataElement.details
    }

  }

  onSubmit(){
    this.good=true;
    this.VisiteFacture.couts = this.montants.couts;
    this.AnnonceService.SendVisites(this.VisiteFacture).subscribe(
      (data)=>{
        this.AnnonceService.getVisitePageUpdate(this.dataElement.id,this.update).subscribe((datas)=>{
          this.AnnonceService.getVisitePage().subscribe((succes)=>{
            this.Setting = succes;
            this.good = false
          })
          console.log(datas);
        },(Error)=>{
          console.log('update =>',Error);
        })
        console.log(data);
      },(Error)=>{
        this.good = false
        console.log(Error);
      }
    )
  }


}
