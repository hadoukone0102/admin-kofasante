import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { result } from '../../Models/types';
import { Observable, map } from 'rxjs';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
import { TypeService } from '../../services/type.service';

@Component({
  selector: 'app-liste-type-med',
  templateUrl: './liste-type-med.component.html',
  styleUrls: ['./liste-type-med.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})

export class ListeTypeMedComponent {

  Settings$!: Observable<result>;
  Setting!: result;

  constructor(
    private route: ActivatedRoute,
    private typeService : TypeService,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['listeTypeMedResolver'])
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
        this.typeService.SupprimerTypeMed(id).subscribe(
            (data) => {
              this.typeService.AfficherListeMed().subscribe(
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
