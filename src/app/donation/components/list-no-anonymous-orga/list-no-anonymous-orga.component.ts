import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-no-anonymous-orga',
  templateUrl: './list-no-anonymous-orga.component.html'
})
export class ListNoAnonymousOrgaComponent {
  donations$!: Observable<DataDon>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listNoAnonymousOrga'])
    );
  }
}
