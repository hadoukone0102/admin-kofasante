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
    private adminService: AdminService
    ) { }

  ngOnInit(): void {
    this.admins$ = this.route.data.pipe(
      map(data => data['listAdmins'])
    );

    this.admins$.subscribe(
      data => {
        this.admins = data;
      }
    );
    
    console.log(this.admins);
  }

  search(term: String){
      this.searchTerms.next(term);
  
      this.admins$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.adminService.searchAdmin(term))
      );
    
      this.admins$.subscribe((data) => {
        this.admins = data;
      });
    }
}
