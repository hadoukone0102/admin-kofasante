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

  /**
   * Get admin list depending statut account (disabled/enabled)
   * when the page is initialized
   * @date 5/17/2023 - 2:27:23 PM
   */
  ngOnInit(): void {
    this.isDisabledAccount();
    if(this.listType === "enabled"){
      this.admins$.subscribe(
        admin => this.admins = admin
      );
    }else{
      this.disabledAccounts$.subscribe(
        disabledAccounts => this.disabledAccounts = disabledAccounts
        );
    }
  }

  /**
   * Returns true if the list to obtain is the list of disabled accounts
   * @date 5/17/2023 - 2:29:11 PM
   *
   * @returns {boolean}
   */
  isDisabledAccount(): boolean {
    if(this.listType === "disabled"){
      return true;
    }
    return false;
  }

  /**
   * Disable the specified account
   * @date 5/17/2023 - 2:32:31 PM
   *
   * @param {string} id
   */
  disabledAdmin(id: string){
    this.adminService.disabledAdmin(id).subscribe(data =>{
      this.admins$ = this.adminService.getAdmins();
      this.admins$.subscribe(
        data => {
          this.admins = data;
        }
      );
    } 
    );
  }

  /**
   * Restore the specified account
   * @date 5/17/2023 - 2:33:22 PM
   *
   * @param {string} id
   */
  restoreAdmin(id: string){
    this.adminService.enabledAdmin(id).subscribe(
      data => this.coreService.goToAdmin(),
      error => console.log("Une erreur s'est produite: "+error)
    )
  }

  /**
   * Go to the edition page for the specified administrator
   * @date 5/17/2023 - 2:33:40 PM
   *
   * @param {string} id
   */
  goToEditAdmin(id: string){
    this.coreService.goToEditAdmin(id);
  }
}
