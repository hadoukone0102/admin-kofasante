import { Component } from '@angular/core';
import { Daum, Paiements } from '../../models/facture.model';
import { Observable, map } from 'rxjs';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute } from '@angular/router';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-kofa-paiement',
  templateUrl: './kofa-paiement.component.html',
  styleUrls: ['./kofa-paiement.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class KofaPaiementComponent {

  good!:boolean;
  Settings$!: Observable<Paiements>;
  Setting!: Array<Daum>;


  constructor(
    private factureService : FactureService,
    private route: ActivatedRoute,
  ){}

  ngOnInit():void{
    this.Settings$ = this.route.data.pipe(
      map(data => data['KofaPaiementResolver'])
    );

    this.Settings$.subscribe(
      data => {
        this.Setting = data.data;
      }
    );

  }

}
