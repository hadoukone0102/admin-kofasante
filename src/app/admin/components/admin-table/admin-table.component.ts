import { Component, Input, OnInit } from '@angular/core';
import { Admin, DataAdmin } from '../../models/admin.model';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html'
})
export class AdminTableComponent implements OnInit{
  @Input() admins$!: Observable<DataAdmin>;
  admins!: DataAdmin;

  constructor(
    private adminService: AdminService,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    this.admins$.subscribe(
      admin => this.admins = admin
    )
  }

  deleteAdmin(id: string){
    this.adminService.deleteAdmin(id).subscribe(data =>{
      this.admins$ = this.adminService.getAdmins();
      this.admins$.subscribe(
        data => {
          this.admins = data;
          console.table(this.admins.administrateurs);
        }
      );
    } 
    );
  }

  goToEditAdmin(id: number){
    this.coreService.goToEditAdmin(id);
  }

}
