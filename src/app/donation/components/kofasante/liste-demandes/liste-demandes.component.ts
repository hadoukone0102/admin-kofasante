import { DonationService } from 'src/app/donation/services/donation.service';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { Analysis, Lecture, Rapport } from 'src/app/donation/models/don.model';

@Component({
  selector: 'app-liste-demandes',
  templateUrl: './liste-demandes.component.html',
  styleUrls: ['./liste-demandes.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class ListeDemandesComponent {

 @Input() Analysis!: Analysis;
 dataElement!:any
 good!:boolean;
 Rapport!:Rapport;
 Lecture!:Lecture;
 showSuccessMessage:boolean=false;

 constructor(
  private DonationService:DonationService,
 ){}

 ngOnInit():void{
  //console.log(this.Analysis);

  this.dataElement ={
    nom:'',
    prenom:'',
    contact:'',
    email:'',
  }

  this.Rapport ={
    nom: '',
    prenom: "",
    email: "",
    contact: "",
    titre: "",
    nomAdmin: "",
    desc: "",
  }

  this.Lecture ={
    nom: '',
    prenom: "",
    email: "",
    contact: "",
    nomAdmin: "",
    desc: "",
  }
 }
  resetFilter(){
    location.reload();
  }

  checkElements(data:any){
    this.dataElement ={
      nom:data.nom,
      prenom:data.prenom,
      contact:data.contact,
      email:data.email,
    }
  }

  onSubmit(){
    this.good = true;
    this.Rapport.nom = this.dataElement.nom;
    this.Rapport.prenom = this.dataElement.prenom;
    this.Rapport.contact = this.dataElement.contact;
    this.Rapport.email = this.dataElement.email;
    this.DonationService.sendRapports(this.Rapport).subscribe(
      (data)=>{
        console.log(data);
        this.DonationService.getListDataForAnalysis().subscribe((data)=>{
          this.good = false;
          this.showSuccessMessage=true;
        })
      },(Error)=>{
        this.good = false;
        console.log(Error);
      }
    )
  }

  onSubmit2(){
    this.Lecture.nom = this.dataElement.nom;
    this.Lecture.prenom = this.dataElement.prenom;
    this.Lecture.contact = this.dataElement.contact;
    this.Lecture.email = this.dataElement.email;
    this.DonationService.sendLecture(this.Lecture).subscribe(
      (data)=>{
        console.log(data);
        this.DonationService.getListDataForAnalysis().subscribe((data)=>{
          this.good = false;
          this.showSuccessMessage=true;
        })
      },(Error)=>{
        this.good = false;
        console.log(Error);
      }
    )
  }
}
