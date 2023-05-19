import { Component, OnInit } from '@angular/core';
import { DataSetPassword } from '../../models/set-password.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-modal-set-password',
  templateUrl: './modal-set-password.component.html'
})
export class ModalSetPasswordComponent implements OnInit{
  groupPasswords!: DataSetPassword;
  pwdIsConfirmed!: boolean;
  pwdExists!: boolean;

  pwdIsInDatabase!:boolean;
  isSubmitting!:boolean;

  constructor(
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.groupPasswords = {
      contactAdmin: sessionStorage.getItem('contact') ?? '', //if null, take ''
      new_password: '',
      confirm_password: '',
      mdpAdmin: ''
    }  
    this.pwdIsConfirmed = true;
    this.pwdExists = true;
    this.isSubmitting = false;
  }
  
  onSubmit(){
    if(this.groupPasswords.new_password != this.groupPasswords.confirm_password){
      this.pwdIsConfirmed = false;
    }
    else{
      this.isSubmitting = true;
      this.pwdExists = true;
      this.adminService.updatePassword(this.groupPasswords).subscribe(
        data => { 
          console.log("Dans dedans");
                              
          if(data.success){
            console.log("Dans dedans SUCCESS");
            this.pwdExists = true; 
            this.pwdIsInDatabase = true;
            this.isSubmitting = false;
            location.reload();
          }
          else{
            console.log("Dans dedans FALSE");
            this.pwdExists = false; 
            this.isSubmitting = false;
          }
        },
        (error) => console.log("Erreur: "+ error)
      );
    }
  }

  onClickConfirmPassword(){
    if(this.groupPasswords.new_password != this.groupPasswords.confirm_password){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }
}
