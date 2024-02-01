import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListeMedia } from 'src/app/donation/models/don.model';
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
  showSuccessMessage:boolean=false;
  constructor( private services : DonationService){

  }

  ngOnInit():void{
    this.dataElement ={
      nom:'',
      prenom:'',
      contact:'',
      email:'',
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
      email:data.email,
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

}
