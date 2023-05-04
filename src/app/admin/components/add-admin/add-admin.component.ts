import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DataAdminAdd, DataAdminResultAdd, DataAmdinErrorAdd } from '../../models/admin.model';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html'
})
export class AddAdminComponent implements OnInit {
  admin!: DataAdminAdd;

  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;

  constructor(
    private adminService: AdminService,
    private coreService: CoreService
    ){}

  resultAdd!: DataAdminResultAdd|DataAmdinErrorAdd

  ngOnInit(): void {
    this.admin = {
      nomAdmin: '',
      prenomAdmin: '',
      contactAdmin: '',
      mdpAdmin: '',
      id_typeadmin: '1',
      id_Eglise: '1'
    };

    this.resultAdd = {
      success: true,
      status_code: 200,
      message: "",
    }

    console.log("mqmq");
    console.log(this.resultAdd);
    
    
    
    this.pwdIsConfirmed = true;
  }

  onSubmit(){
    console.log("Submit oki");
    
    this.adminService.addAdmin(this.admin).subscribe(
      (admin) => {
        this.resultAdd = admin;
        console.log("Le admin: "+ admin.success+" :finished");
        if (admin.success === true){
          this.coreService.goToAdmin();
        }else{
          console.log("Le sucre: "+this.resultAdd.success);
        }
      },
      (error)=> console.log("mon erreur: "+error)
      );
  }


  checkValidity() {
    if(this.admin.nomAdmin === "" ) {
      // this.ad  
    }
  }

  onClickConfirmPassword(){
    if(this.admin.mdpAdmin != this.confirmPassword){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }
}
