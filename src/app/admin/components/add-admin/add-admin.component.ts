import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DataAdmin, DataAdminAdd, DataAdminResultAdd, DataAmdinErrorAdd, sendDatasForAddAdmin } from '../../models/admin.model';
import { CoreService } from 'src/app/core/services/core.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataCountry } from '../../models/country-code.model';
import { DataAdminType, typeAdmin } from '../../models/admin-type.model';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html'
})
export class AddAdminComponent implements OnInit {
  countries$!: Observable<DataCountry>;
  countries!: DataCountry;
  countryCode!: string;
  contact!: string;

  admin!: sendDatasForAddAdmin;

  listAdminTypes!: typeAdmin;

  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;
  contactExists!: boolean;

  resultAdd!: DataAdminResultAdd|DataAmdinErrorAdd;
  // ~~~~~~~~~~~~~~~ Spinner ~~~~~~~~~~~~~~~ //
  isSubmitting!: boolean;

  // ~~~~~~~~~~~~~~~~ Select ~~~~~~~~~~~~~~~ //
  isSelected: boolean = false;

  constructor(
    private adminService: AdminService,
    private coreService: CoreService,
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
    this.countryCode = '+225';
    this.pwdIsConfirmed = true;
    this.isSubmitting = false;

    this.admin = {
      nom: '',
      prenom: '',
      contact: '',
      mot_de_passe: '',
      type: '',
    };

    this.resultAdd = {
      status: 1,
      message: "",
    };

    //Get admin type list from resolver
    this.route.data.pipe(
      map(data => data['listAdminTypes'])
    ).subscribe(
      data => {
        this.listAdminTypes = data;
        console.log(this.listAdminTypes);
      }
    );
  }

  /**
   * Add admin in database
   * @date 5/17/2023 - 2:51:27 PM
   */
  showMessage:boolean=false;
  message!:string;
  onSubmit(){
    this.isSubmitting = true;
    this.contactExists =false;
    console.log(this.admin);
    this.adminService.addAdmin(this.admin).subscribe(
      (admin) => {
        this.isSubmitting = false;
        this.resultAdd = admin;
        this.showMessage=true;
        this.message = admin.message;
        if (admin.message){
          this.contactExists = false;
          this.coreService.goToAdmin();
        }else{
          this.contactExists =true;
        }
      },

      (error)=> console.log("Une erreur est survenu:: "+error)

      );
  }

  /**
   * Return true if password and confirm password match
   * @date 5/17/2023 - 2:54:07 PM
   */
  onClickConfirmPassword(){
    if(this.admin.mot_de_passe != this.confirmPassword){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }

  /**
   * Get the list of administrators' contacts and return true
   * if the value of the contact matches one of the contacts in the obtained list.
   * @date 5/17/2023 - 2:54:57 PM
   */
  disabledContactExists(){
    this.contactExists = false;
  }

  /**
   * Get country code select value
   * @date 5/17/2023 - 2:49:24 PM
   *
   * @param {string} val
   */
  onClickContryCode(val: string){
    this.countryCode = val;
  }
}
