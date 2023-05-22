import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { CoreService } from 'src/app/core/services/core.service';
import { DataAdminByid } from '../../models/admin-by-id.model';
import { DataSetTypeAndContactAdmin } from '../../models/set-type-admin.model';
import { DataAdminType } from '../../models/admin-type.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html'
})
export class EditAdminComponent implements OnInit{
  contact!: string;

  admin!: DataAdminByid;
  typeAdmin!: DataSetTypeAndContactAdmin;

  listAdminTypes!: DataAdminType;

  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;
  contactExists!: boolean;
  // ~~~~~~~~~~~~~~~ Spinner ~~~~~~~~~~~~~~~ //
  isSubmitting!: boolean;

  

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private coreService: CoreService
  ){}
  
  ngOnInit(): void {
    this.isSubmitting = false;
    this.contactExists =false;

    //Get admin by id from resolver
    this.route.data.pipe(
      map(data => data['adminById'])
    ).subscribe(
      data => {
        this.admin = data;
        
        this.typeAdmin = {
          id: +this.admin.administrateur.id,
          newcontactAdmin: this.admin.administrateur.contactAdmin,
          id_typeadmin: this.admin.administrateur.id_typeadmin
        };
      }
    );
    //Get admin type list from resolver
    this.route.data.pipe(
      map(data => data['listAdminTypes'])
    ).subscribe(
      data => {
        this.listAdminTypes = data;
      }
    );

   
  }

  

  /**
   * Update type and phone number of specified administrator
   * @date 5/17/2023 - 3:07:32 PM
   */
  onSubmit(){
    this.isSubmitting = true;
    if(this.typeAdmin.id_typeadmin)
    this.adminService.updateTypeAdmin(this.typeAdmin).subscribe(
      data => {
        if(data.success){
          this.contactExists = false;
          this.isSubmitting = false;
          this.coreService.goToAdmin();
        }else{
          this.isSubmitting = false;
          this.contactExists = true;
        }
      },
      (error) => console.log("Une erreur s'est produite: "+error)
    )
  }

  /**
   * Return true if admin type of select matches admin type of specified administrator
   * @date 5/17/2023 - 3:09:17 PM
   *
   * @param {number} type
   * @returns {boolean}
   */
  isAdminType(type: number): boolean{
    if(this.admin.administrateur.id_typeadmin === type){
      return true;
    }
    return false;
  }

  /**
   * Get the list of administrators' contacts and return true
   * if the value of the contact matches one of the contacts in the obtained list.
   * @date 5/17/2023 - 2:54:57 PM
   */
  onClickContact(){
    this.contactExists = false;
  }
}
