import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { RapporUser } from 'src/app/demandes/models/demande.model';
import { AnaUser, Daum, Daums, LectureListe } from 'src/app/donation/models/don.model';
import { DonationService } from 'src/app/donation/services/donation.service';

@Component({
  selector: 'app-list-analyse',
  templateUrl: './list-analyse.component.html',
  styleUrls: ['./list-analyse.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class ListAnalyseComponent {


  good!:boolean;
  Settings$!: Observable<LectureListe>;
  Setting!: Array<Daums>;

  selectedItem!:any;
  RapporUser!:AnaUser;

  constructor(
    private factureService : DonationService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['ListAnalyseResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data.data;
        console.log(this.Setting);
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

    this.RapporUser ={
      nom: '',
      prenom: '',
      contact:'',
      email:'',
      nomAdmin:'',
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
   this.factureService.getListDataForAnalysisUpdate(this.selectedItem.id,this.RapporUser).subscribe(
    (Response)=>{
      this.factureService.getListAnalysis().subscribe(
        (data)=>{
          this.Setting = data.data;
          this.good = false;
        }
      )
      this.show=true;
      this.message = "l'analyse a été modifié avec succès";
      console.log(Response);
    },
    (Error)=>{
      console.log(Error);
    }
   )
  }


  DeleteMedia(id: string | number) {
    const userConfirmed = window.confirm("Voulez-vous vraiment supprimer ce rapport d'analyse ?");
    if (userConfirmed) {
        this.factureService.getListDataForAnalysisDelete(id).subscribe(
            (data) => {
              this.factureService.getListAnalysis().subscribe(
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
