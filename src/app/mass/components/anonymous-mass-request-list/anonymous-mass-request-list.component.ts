import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MassRequest } from '../../models/mass-request.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-anonymous-mass-request-list',
  templateUrl: './anonymous-mass-request-list.component.html'
})
export class AnonymousMassRequestListComponent {
  messe$!: Observable<MassRequest>;
  type!: string;
  valeur!:boolean;
  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.type="anonymous";
    this.valeur = true;
    this.messe$ = this.route.data.pipe(
      map(data =>data['massAnonymousRequestResolver']),
    );
    
  }
}
