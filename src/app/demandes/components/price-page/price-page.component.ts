import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Daum, ElementPage, Prix, RapporUser, RapportsModels, RenseignerPage, SendPrix } from '../../models/demande.model';
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

  selectedItem!:any;
  update!:SendPrix;
  RapporUser!:RapporUser;

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
      }
    );

    this.selectedItem = {
      id:'',
      nom: '',
      prenom: '',
      contact:'',
      email:'',
      nomAdmin:'',
      titre: '',
      desc:''
    };

    this.update ={
      prix: 0,
    }

    this.RapporUser ={
      nom: '',
      prenom: '',
      contact:'',
      email:'',
      nomAdmin:'',
      titre: '',
      desc:''
    }

  }

  selectedRow(item: any): void {
    this.selectedItem = {
      id:item.id,
      nom:item.nom,
      prenom: item.prenom,
      contact:item.contact,
      email:item.email,
      nomAdmin:item.nomAdmin,
      titre: item.titre,
      desc: item.desc
    };

    this.RapporUser ={
      nom: this.selectedItem.nom,
      prenom: this.selectedItem.prenom,
      contact:this.selectedItem.contact,
      email:this.selectedItem.email,
      nomAdmin:this.selectedItem.nomAdmin,
      titre: this.selectedItem.titre,
      desc:this.selectedItem.desc,
    }

    console.log(this.selectedItem);
  }

  message!:string;
  show:boolean=false;
  onSubmit(){
  this.good = true;
  console.log(this.selectedItem.id);
  console.log(this.RapporUser);
   this.AnnonceService.getUpadteRapport(this.selectedItem.id,this.RapporUser).subscribe(
    (Response)=>{
      this.AnnonceService.getPricePage().subscribe(
        (data)=>{
          this.Setting = data.data;
          this.good = false;
        }
      )
      this.show=true;
      this.message = "le rapport a été modifié avec succès";
      console.log(Response);
    },
    (Error)=>{
      console.log(Error);
    }
   )
  }

  DeleteMedia(id: string | number) {
    const userConfirmed = window.confirm("Voulez-vous vraiment supprimer ce rapport ?");
    if (userConfirmed) {
        this.AnnonceService.getDeleteRapport(id).subscribe(
            (data) => {
              this.AnnonceService.getPricePage().subscribe(
                (data)=>{
                  this.Setting = data.data;
                  this.good = false;
                }
              )
              this.show = true;
              this.message="rapport supprimer avec succès";
            },
            (error) => {
              this.show = true;
              this.message="impossible de supprimer ce rapport";
                console.log(error);
            }
        );
    }
}

}
