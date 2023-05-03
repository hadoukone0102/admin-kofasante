import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataAdmin } from '../../models/admin.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html'
})
export class AdminListComponent {
  admins$!: Observable<DataAdmin>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.admins$ = this.route.data.pipe(
      map(data => data['listAdmins'])
    );
  }
}
