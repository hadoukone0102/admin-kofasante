import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Daum, ElementPage, Prix, RapportsModels, RenseignerPage, SendPrix } from '../../models/demande.model';
import { DemandeService } from '../../services/demande.service';

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class PricePageComponent {
  good!:boolean;
  Settings$!: Observable<RapportsModels>;
  Setting!: Array<Daum>;
   // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~ //
   isFirstPage!: string;
   isLastPage!: string;
   newPage!: number;
     // ~~~~~~~~~~ Opinion variables ~~~~~~~~~ //
  messe$!: Observable<Prix>;
  messeTest$!: Observable<Prix>;

  selectedItem!:ElementPage;
  update!:SendPrix;


  constructor(
    private AnnonceService : DemandeService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['PricePageResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data.data;
        console.log(this.Setting);
      }
    );

    this.selectedItem = {
      id:1,
      types: '',
      typeService: '',
      price: 0,
    };

    this.update ={
      prix: 0,
    }


  }

  selectedRow(item: any): void {
    this.selectedItem = {
      id:item.id,
      types: item.service,
      typeService: item.type_service,
      price: item.prix
    };

    this.update ={
      prix: this.selectedItem.price,
    }

  }

  onSubmit(){
    this.good = true;
   this.AnnonceService.UpdatePrice(this.selectedItem.id,this.update).subscribe(
    (Response)=>{
      this.AnnonceService.getPricePage().subscribe(
        (data)=>{
          this.Setting = data.data;
          this.good = false;
        }
      )
    },
    (Error)=>{
      console.log(Error);
    }
   )
  }

}
