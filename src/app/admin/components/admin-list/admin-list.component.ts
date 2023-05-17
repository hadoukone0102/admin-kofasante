import { Component } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DataAdmin } from '../../models/admin.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent {
  admins$!: Observable<DataAdmin>;
  admins!: DataAdmin;

  searchTerms =  new Subject<String>();
  searchBarValue: string = "";

  constructor(
    private route: ActivatedRoute,
    ) { }

  /**
   * Get admin list when the page is initialized
   * @date 5/17/2023 - 2:38:45 PM
   */
  ngOnInit(): void {
    this.admins$ = this.route.data.pipe(
      map(data => data['listAdmins'])
    );

    this.admins$.subscribe(
      data => {
        this.admins = data;
      }
    );
  }
}
