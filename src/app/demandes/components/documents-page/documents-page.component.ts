import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { DocumentPage } from '../../models/demande.model';
import { Observable, map } from 'rxjs';
import { DemandeService } from '../../services/demande.service';
import { documentsFacture, update } from 'src/app/facturation/models/facture.model';

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
  // data for modal
  dataElement!:any
  documentsFacture!:documentsFacture;
  montants!:any;
  update!:update;
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

    this.documentsFacture ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      type:'document',
      rdv:'',
      dateRdv:'',
      autreTypeDocs:'',
      autreTypeRDV:'',
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

  // for madal page

  checkElements(data:any){
    this.dataElement ={
      id:data.id,
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

    this.documentsFacture ={
      nom:this.dataElement.nom,
      prenom:this.dataElement.prenom,
      contact:this.dataElement.contact,
      email:this.dataElement.email,
      type:'document',
      status:false,
      rdv:this.dataElement.rdv,
      dateRdv:this.dataElement.dateRdv,
      autreTypeDocs:this.dataElement.typeServices,
      autreTypeRDV:this.dataElement.consultVar,
      couts:this.dataElement.couts,
      details:this.dataElement.details
    }

  }

  onSubmit(){
    this.good=true;
    this.documentsFacture.couts = this.montants.couts;
    this.AnnonceService.SendFacture(this.documentsFacture).subscribe(
      (data)=>{
        this.AnnonceService.getDocumentsPageUpdate(this.dataElement.id,this.update).subscribe((datas)=>{
          this.AnnonceService.getDocumentsPage().subscribe((succes)=>{
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
