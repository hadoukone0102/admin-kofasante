import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataAdmin } from '../../models/admin.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAdminByid } from '../../models/admin-by-id.model';
import { DataSetPassword } from '../../models/set-password.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html'
})
export class EditAdminComponent implements OnInit{
  contact!: string;

  admin!: DataAdminByid;
  typeAdmin!: DataSetPassword;

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
        console.log("grand: "+this.admin.administrateur.nomAdmin);
    }
    );
  }

  onSubmit(){
    this.adminService.updateTypeAdmin(this.typeAdmin).subscribe(
      data => {
        console.log("donnee recus de type admin: "+data);
        this.coreService.goToAdmin();
      },
      (error) => console.log("Une erreur s'est produite!")
    )
  }
}
