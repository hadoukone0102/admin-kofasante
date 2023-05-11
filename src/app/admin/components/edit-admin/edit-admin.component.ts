import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataAdmin } from '../../models/admin.model';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html'
})
export class EditAdminComponent implements OnInit{
  contact!: string;

  admin!: DataAdmin;

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
    // this.route.data.pipe(
    //   map(data => data['admin'])
    // ).subscribe(
    //   data => this.admin = data
    // );
  }

  onSubmit(){
    this.adminService.updateTypeAdmin(this.admin).subscribe(
      data => {
        console.log("donnee recus de type admin: "+data);
        this.coreService.goToAdmin();
      },
      (error) => console.log("Une erreur s'est produite!")
    )
  }
}
