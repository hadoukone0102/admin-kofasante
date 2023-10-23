import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MassRequest } from '../../models/mass-request.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-no-anonymous-mass-request-list',
  templateUrl: './no-anonymous-mass-request-list.component.html'
})
export class NoAnonymousMassRequestListComponent {
  messe$!: Observable<MassRequest>;
  valeur!:boolean;
  type!: string;
  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.type="noAnonymous"
    this.valeur = true;
    this.messe$ = this.route.data.pipe(
      map(data =>data['massNoAnonymousRequestResolver']),
    );
  }
}
