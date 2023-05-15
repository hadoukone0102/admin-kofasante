import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataAdmin } from '../../models/admin.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAdminByid } from '../../models/admin-by-id.model';
import { DataSetPassword } from '../../models/set-password.model';
import { DataSetTypeAdmin } from '../../models/set-type-admin.model';
import { DataAdminType } from '../../models/admin-type.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html'
})
export class EditAdminComponent implements OnInit{
  contact!: string;

  admin!: DataAdminByid;
  typeAdmin!: DataSetTypeAdmin;

  listAdminTypes!: DataAdminType;

  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;
  contactExists!: boolean;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private coreService: CoreService
  ){}
  
  ngOnInit(): void {
    this.route.data.pipe(
      map(data => data['adminById'])
    ).subscribe(
      data => {
        this.admin = data;
        
        this.typeAdmin = {
          contactAdmin: this.admin.administrateur.contactAdmin,
          id_typeadmin: this.admin.administrateur.id_typeadmin
        };
      }
    );
    
    this.route.data.pipe(
      map(data => data['listAdminTypes'])
    ).subscribe(
      data => {
        this.listAdminTypes = data;
      }
    );
    
    
  }

  onSubmit(){
    this.adminService.updateTypeAdmin(this.typeAdmin).subscribe(
      data => {
        console.log("donnee recus de type admin: "+data.success);
        this.coreService.goToAdmin();
      },
      (error) => console.log("Une erreur s'est produite!")
    )
  }
}
