import { categorie } from './../../../models/don.model';
import { Component, OnInit } from '@angular/core';
import { DataDon, Don } from '../../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

@Component({
  selector: 'app-list-anonymous',
  templateUrl: './list-anonymous.component.html',
})
export class ListAnonymousComponent implements OnInit{
  categorie$!: Observable<categorie>;

  constructor(
    private route: ActivatedRoute,
    ) { }

  /**
   * Get the list of anonymous donations when the page is initialized
   * @date 5/17/2023 - 1:53:18 PM
   */
  ngOnInit(): void {
    this.categorie$ = this.route.data.pipe(
      map(data => data['listAnonymous']),
    );
  }
}
