import { Component, OnInit } from '@angular/core';
import { DataSetPassword } from '../../models/set-password.model';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';

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

  // ~~~~~~~~~ Show hidden password ~~~~~~~~ //
  passwordTest!: string;
  showPassword: boolean = false;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ){}

  ngOnInit(): void {
    this.groupPasswords = {
      contactAdmin: this.authService.getContactOfAdminLogged() ?? '', //if null, take ''
      new_password: '',
      confirm_password: '',
      mdpAdmin: ''
    }  
    this.pwdIsConfirmed = true;
    this.pwdExists = true;
    this.isSubmitting = false;
  }
  
  /**
   * Send passwords to api to apply modifications
   * @date 5/23/2023 - 8:33:33 AM
   */
  onSubmit(){
    if(this.groupPasswords.new_password != this.groupPasswords.confirm_password){
      this.pwdIsConfirmed = false;
    }
    else{
      this.isSubmitting = true;
      this.pwdExists = true;
      this.adminService.updatePassword(this.groupPasswords).subscribe(
        data => { 
          if(data.success){
            this.pwdExists = true; 
            this.pwdIsInDatabase = true;
            this.isSubmitting = false;
            location.reload(); //reload the page 
          }
          else{
            this.pwdExists = false; 
            this.isSubmitting = false;
          }
        },
        (error) => console.log("Erreur: "+ error)
      );
    }
  }

  /**
   * Check if the tow password match
   * @date 5/23/2023 - 8:31:31 AM
   */
  onClickConfirmPassword(){
    if(this.groupPasswords.new_password != this.groupPasswords.confirm_password){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }

  /**
 * Toogle password visibility
 * @date 5/22/2023 - 6:59:19 PM
 */
togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}
}
