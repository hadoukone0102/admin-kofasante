import { Component, OnInit } from '@angular/core';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-list-anonymous',
  templateUrl: './list-anonymous.component.html',
})
export class ListAnonymousComponent implements OnInit{
  donations$!: Observable<DataDon>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listAnonymous']),
    );
  }


}
