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

  constructor(){}

  ngOnInit():void{
    //console.log(this.media);
  }

  resetFilter() {
    location.reload();
  }

}
