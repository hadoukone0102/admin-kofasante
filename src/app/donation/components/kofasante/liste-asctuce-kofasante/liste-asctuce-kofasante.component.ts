import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListeMedia, MediaUpdate } from 'src/app/donation/models/don.model';
import { DonationService } from 'src/app/donation/services/donation.service';

@Component({
  selector: 'app-liste-asctuce-kofasante',
  templateUrl: './liste-asctuce-kofasante.component.html',
  styleUrls: ['./liste-asctuce-kofasante.component.css']
})
export class ListeAsctuceKofasanteComponent {

  @Input() media!:ListeMedia;
  dataElement!:any
  good!:boolean;
  Rappel!:any;
  MediaUpdate!:MediaUpdate;
  showSuccessMessage:boolean=false;
  message!:string;
  constructor( private services : DonationService){

  }

  ngOnInit():void{
    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      desc:'',
      titre:'',
    }


    this.Rappel={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
      titre:'',
      date: '',
      heure: '',
      jour:''
    }
    this.MediaUpdate ={
      desc:''
    }
  }

  resetFilter() {
    location.reload();
  }

  checkElements(data:any){
    this.dataElement ={
      id:data.id,
      nom:data.nom,
      prenom:data.prenom,
      contact:data.contact,
      desc:data.desc,
      titre:data.titre
    }
    this.MediaUpdate ={
      desc:this.dataElement.desc
    }
  }

  DeleteMedia(id: string | number) {
    const userConfirmed = window.confirm("Voulez-vous vraiment supprimer cette publication ?");

    if (userConfirmed) {
        console.log(id);
        this.services.DeleteMedias(id).subscribe(
            (data) => {
                console.log(data);
                this.showSuccessMessage = true;
            },
            (error) => {
                console.log(error);
            }
        );
    }
}

onSubmit(){
  this.good = true;
  this.services.updatePublication(this.MediaUpdate,this.dataElement.id).subscribe(
    (data)=>{
      this.message = data.message;
      this.good = false;
    },(Error)=>{
      console.log(Error);
      this.good = false;
    }
  )
}

}
