import { Component, Input, OnInit } from '@angular/core';
import { Admin, DataAdmin } from '../../models/admin.model';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DataDisabledAccount } from '../../models/disabled-account-admin.model';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html'
})
export class AdminTableComponent implements OnInit{
  @Input() listType!: string;

  @Input() admins$!: Observable<DataAdmin>;
  admins!: DataAdmin;

  @Input() disabledAccounts$!: Observable<DataDisabledAccount>;
  disabledAccounts!: DataDisabledAccount;
  

  constructor(
    private adminService: AdminService,
    private coreService: CoreService
  ){}

  ngOnInit(): void {
    this.isDisabledAccount();
    if(this.listType === "enabled"){
      this.admins$.subscribe(
        admin => this.admins = admin
      )
    }else{
      this.disabledAccounts$.subscribe(
        disabledAccounts => this.disabledAccounts = disabledAccounts
        
        );
        console.table(this.disabledAccounts.administrateurs);
    }

  }

  isDisabledAccount(): boolean {
    if(this.listType === "disabled"){
      console.log("le vrai");
      
      return true;
    }
    return false;
  }

  deleteAdmin(id: string){
    this.adminService.disabledAdmin(id).subscribe(data =>{
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

  restoreAdmin(id: string){
    this.adminService.enabledAdmin(id).subscribe(
      data => this.coreService.goToAdmin(),
      error => console.log("Une erreur s'est produite: "+error)
    )
  }

  goToEditAdmin(id: string){
    this.coreService.goToEditAdmin(id);
  }

}
