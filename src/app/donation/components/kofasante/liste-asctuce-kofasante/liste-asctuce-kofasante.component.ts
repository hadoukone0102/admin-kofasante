import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListeMedia } from 'src/app/donation/models/don.model';

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
  constructor(){}

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

  onSubmit(){

  }
}
