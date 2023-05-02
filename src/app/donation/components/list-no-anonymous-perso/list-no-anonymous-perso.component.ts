import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-no-anonymous-perso',
  templateUrl: './list-no-anonymous-perso.component.html'
})
export class ListNoAnonymousPersoComponent {
  donations$!: Observable<DataDon>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listNoAnonymousPerso'])
    );
    console.log('mameee perso');
      
    console.log(this.donations$);
  }
}
