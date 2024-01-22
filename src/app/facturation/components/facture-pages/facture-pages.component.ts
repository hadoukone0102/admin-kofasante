import { Component } from '@angular/core';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Facture } from '../../models/facture.model';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-facture-pages',
  templateUrl: './facture-pages.component.html',
  styleUrls: ['./facture-pages.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class FacturePagesComponent {
  good!:boolean;
  Settings$!: Observable<Facture>;
  Setting!: Facture;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;

   constructor(
    private AnnonceService : FactureService,
    private route: ActivatedRoute,
  ){}

 ngOnInit():void{
  this.Settings$ = this.route.data.pipe(
    map(data => data['FacturePagesResolver'])
  );

  this.Settings$.subscribe(
    data => {
      this.Setting = data;
    }
  );

  console.log(this.Setting);
 }


  checkAndApplyDisabled(data: Facture){
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

    this.AnnonceService.getListFacturePaginate(this.newPage.toString()).subscribe((data) => {
      this.Setting = data;
      this.checkAndApplyDisabled(data);
    });

  }



}
