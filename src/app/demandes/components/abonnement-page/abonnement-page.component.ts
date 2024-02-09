import { CoreService } from './../../../core/services/core.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AbonnementPage } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { AbonnementFacture, update } from 'src/app/facturation/models/facture.model';

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
  // data for modal
  dataElement!:any
  AbonnementFacture!:AbonnementFacture;
  montants!:any;
  update!:update;
  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
    private CoreService: CoreService,
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

    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      forfait:'',
      nombreVisite:'',
      services:'',
      typeServices:'',
      couts:0,
      details:''
    }
    this.montants ={
      couts:this.dataElement.couts
    }
    this.update={
      status:false
    }
  }

  checkAndApplyDisabled(data: AbonnementPage){
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

    this.AnnonceService.getAbonnementPagination(this.newPage.toString()).subscribe((data) => {
      this.Setting = data;
      this.checkAndApplyDisabled(data);
    });

  }

    // for madal page
    checkElements(data:any){
      this.dataElement ={
        id:data.id,
        nom:data.nom,
        prenom:data.prenom,
        contact:data.contact,
        email:data.email,
        forfait:data.forfait,
        nombreVisite:data.nombreVisite,
        services:data.services,
        typeServices:data.typeServices,
        couts:data.couts,
        details:data.details,
        status:data.status
      }

      this.AbonnementFacture ={
        nom:this.dataElement.nom,
        prenom:this.dataElement.prenom,
        contact:this.dataElement.contact,
        email:this.dataElement.email,
        type:'abonnement',
        status:false,
        forfait:this.dataElement.forfait,
        nombreVisite:this.dataElement.nombreVisite,
        services:this.dataElement.services,
        typeServices:this.dataElement.typeServices,
        couts:this.dataElement.couts,
        details:this.dataElement.details
      }

      this.update={
        status:this.dataElement.status
      }

    }

    onSubmit(){
      this.good=true;
      this.AbonnementFacture.couts = this.montants.couts;
      this.AnnonceService.SendAbonnement(this.AbonnementFacture).subscribe(
        (data)=>{
          this.AnnonceService.getAbonnementPageUpdate(this.dataElement.id,this.update).subscribe((datas)=>{
            this.AnnonceService.getAbonnementPage().subscribe((succes)=>{
              this.Setting = succes;
              this.good = false
            })
            console.log(datas);
          },(Error)=>{
            console.log('update =>',Error);
          })
          //this.CoreService.goToFactures();
        },(Error)=>{
          this.good = false
          console.log(Error);
        }
      )
    }

    DeleteMedia(id: string | number) {
      const userConfirmed = window.confirm("Voulez-vous vraiment annuler cette demande ?");
      if (userConfirmed) {
          this.AnnonceService.getAbonnementPageDelete(id).subscribe(
              (data) => {
                this.AnnonceService.getAbonnementPage().subscribe(
                  (data)=>{
                    this.Setting = data;
                    this.good = false;
                  }
                )
              },
              (error) => {
                  console.log(error);
              }
          );
      }
  }
}
