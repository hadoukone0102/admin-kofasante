import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { result } from '../../Models/types';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-liste-type-doc',
  templateUrl: './liste-type-doc.component.html',
  styleUrls: ['./liste-type-doc.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class ListeTypeDocComponent {
  Settings$!: Observable<result>;
  Setting!: result;

  constructor(
    private route: ActivatedRoute,
    private typeService : TypeService,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['listeTypeDocResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data;
      }
    );
  }

  DeleteMedia(id:number){
    const userConfirmed = window.confirm("Voulez-vous vraiment annuler ce type ?");
    if (userConfirmed) {
        this.typeService.SupprimerTypeDoc(id).subscribe(
            (data) => {
              this.typeService.AfficherListeDoc().subscribe(
                (data)=>{
                  this.Setting = data;
                }
              )
            },
            (error) => {
                console.log(error);
            }
        );
    }
  }

  checkElements(param:any){}
}
