import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Medecine } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { MedecineFacture, update } from 'src/app/facturation/models/facture.model';

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
   MedecineFacture!:MedecineFacture;
   montants!:any;
   update!:update;
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

    this.MedecineFacture ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      type:'medecine',
      consultant:'',
      tyeConsultation:'',
      dateTot:'',
      dateTard:'',
      couts:0,
      details:'',
      status:false,
    }

    this.montants={
      couts:0
    }

    this.update={
      status:false
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
        id:data.id,
        nom:data.nom,
        prenom:data.prenom,
        contact:data.contact,
        email:data.email,
        consultant:data.consultant,
        tyeConsultation:data.tyeConsultation,
        dateTot:data.dateTot,
        dateTard:data.dateTard,
        couts:data.couts,
        details:data.details,
        status:data.status
      }

      this.MedecineFacture = {
        nom:this.dataElement.nom,
        prenom:this.dataElement.prenom,
        contact:this.dataElement.contact,
        email:this.dataElement.email,
        type:'Consultation',
        status:false,
        consultant:this.dataElement.consultant,
        tyeConsultation:this.dataElement.tyeConsultation,
        dateTot:this.dataElement.dateTot,
        dateTard:this.dataElement.dateTard,
        couts:this.dataElement.couts,
        details:this.dataElement.details
      }

      this.update={
        status:this.dataElement.status
      }
    }

    onSubmit(){
      this.good=true;
      this.MedecineFacture.couts = this.montants.couts;
      this.AnnonceService.SendMedecine(this.MedecineFacture).subscribe(
        (data)=>{
          this.AnnonceService.getMedecinePageUpdate(this.dataElement.id,this.update).subscribe((datas)=>{
            this.AnnonceService.getMedecinePage().subscribe((succes)=>{
              this.Setting = succes;
              this.good = false
            })
            console.log(datas);
          },(Error)=>{
            console.log('update =>',Error);
          })
          this.good = false
          console.log(data);
        },(Error)=>{
          this.good = false
          console.log(Error);
        }
      )
    }

    DeleteMedia(id: string | number) {
      const userConfirmed = window.confirm("Voulez-vous vraiment annuler cette demande ?");
      if (userConfirmed) {
          this.AnnonceService.getMedecinePageDelete(id).subscribe(
              (data) => {
                this.AnnonceService.getMedecinePage().subscribe(
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
