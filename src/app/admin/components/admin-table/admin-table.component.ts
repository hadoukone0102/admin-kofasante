import { Component, Input, OnInit } from '@angular/core';
import { DataAdmin } from '../../models/admin.model';
import { Observable } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DataDisabledAccount } from '../../models/disabled-account-admin.model';
import { style, transition, trigger, animate, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-admin-table',
  templateUrl: './admin-table.component.html',
  animations:[
    trigger('lineAnime', [
      transition(':leave', [
        style({
            transform: 'translateX(0)',
            opacity: 1,
            // 'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
            transform: 'translateX(-100px)',
            opacity: 0,
            // 'background-color': 'aqua',
        }))
    ]),
      transition(':enter', [
        style({
          transform: 'translateX(-100px)',
          opacity: 0,
            // 'background-color': 'rgb(201, 157, 242)',
        }),
        animate('250ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
            // 'background-color': 'aqua',
        }))
    ]),
  ]),

  trigger('boomTrigger', [
    transition('* => *', [
      query(':enter', style({opacity:0}), {optional: true}),
      
      query(':enter', stagger('300ms',[
        animate('1s ease-in', keyframes([
          style({opacity: .3, transform: 'translateY(-75px)', offset: 0}),//depart
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),//ensuite
          style({opacity: 1, transform: 'translateY(0)', offset: 1}),//final (position initial)
        ]))
      ]), {optional: true}),
      query(':leave', stagger('300ms',[
        animate('1s ease-in', keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),//final (position initial)
          style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}),//ensuite
          style({opacity: .3, transform: 'translateY(-75px)', offset: 1}),//depart
        ]))
      ]), {optional: true}) ,
    ])
  ]),
  ]
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

  // Méthode trackBy pour identifier chaque administrateur par son id unique
trackByAdminId(index: number, admin: any): number {
  return admin.id; // Remplacez "id" par la propriété unique de votre administrateur
}
  
// Méthode trackBy pour identifier chaque administrateur par son id unique
trackByDisabledAccountId(index: number, disabledAccount: any): number {
  return disabledAccount.id; // Remplacez "id" par la propriété unique de votre administrateur
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
    if(confirm("Etes vous sur de vouloir désactiver ce compte ?")){
      this.adminService.disabledAdmin(id).subscribe(data =>{
        this.admins$ = this.adminService.getAdmins();
        this.admins$.subscribe(
          data => this.admins = data,
          error => console.log("Une erreur s'est produite: "+error)
        );
      } 
      );
    }
  }

  /**
   * Restore the specified account
   * @date 5/17/2023 - 2:33:22 PM
   *
   * @param {string} id
   */
  restoreAdmin(id: string){
    if(confirm("Etes vous sûr de vouloir restorer ce compte ?")){
      this.adminService.enabledAdmin(id).subscribe(data =>{
        this.disabledAccounts$ = this.adminService.getDisabledAccount();
        this.disabledAccounts$.subscribe(
          data => this.disabledAccounts = data,
          error => console.log("Une erreur s'est produite: "+error)
        );
      } 
      );
    }
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
