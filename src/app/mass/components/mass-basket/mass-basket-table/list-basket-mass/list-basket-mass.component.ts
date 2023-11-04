import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MassRequest } from '../../../../models/mass-request.model';

@Component({
  selector: 'app-list-basket-mass',
  templateUrl: './list-basket-mass.component.html',
  styleUrls: ['./list-basket-mass.component.css']
})
export class ListBasketMassComponent {
  messe$!: Observable<MassRequest>;
  type!: string;
  constructor(
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.type="basket"
    this.messe$ = this.route.data.pipe(
      map(data =>data['basketResolver']),
    );
    
  }
}
