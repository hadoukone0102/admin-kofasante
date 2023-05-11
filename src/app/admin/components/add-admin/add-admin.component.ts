import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DataAdmin, DataAdminAdd, DataAdminResultAdd, DataAmdinErrorAdd } from '../../models/admin.model';
import { CoreService } from 'src/app/core/services/core.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataCountry } from '../../models/country-code.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html'
})      
export class AddAdminComponent implements OnInit {
  countries$!: Observable<DataCountry>;
  countries!: DataCountry;
  countryCode!: string;
  contact!: string;

  admin!: DataAdminAdd;

  adminList$!: Observable<DataAdmin>;
  adminList!: DataAdmin;

  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;
  contactExists!: boolean;
  
  resultAdd!: DataAdminResultAdd|DataAmdinErrorAdd
  constructor(
    private adminService: AdminService,
    private coreService: CoreService,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.countryCode = '+225';
    
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
    };

    this.pwdIsConfirmed = true;
    

    this.adminList$ = this.route.data.pipe(
      map(data => data['listAdmins'])
    );

    this.adminList$.subscribe(
      data => {
        this.adminList = data;
      }
    );

    

    this.countries$ = this.route.data.pipe(
      map(data => data['countryCode'])
    );
    this.countries$.subscribe(data => this.countries = data);
  }

  onClickContryCode(val: string){
    this.countryCode = val;
  }

  onSubmit(){
    this.admin.contactAdmin = this.countryCode + this.contact;
    
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

  onClickConfirmPassword(){
    if(this.admin.mdpAdmin != this.confirmPassword){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }

  onClickContact(){
    this.admin.contactAdmin = this.countryCode + this.contact;
    console.log("mon contzct: "+this.admin.contactAdmin);
    
    this.adminList.administrateurs.some(adminInDB => {
      if (adminInDB.contactAdmin === this.admin.contactAdmin) {
        this.contactExists = true;
        console.log("dans le for TRUE");
        return true;
        // return ; // pour arreter la boucle
      }else{
        this.contactExists = false;
        console.log("dans le for FALSE");
        return false;
      }
    });
  }
}
