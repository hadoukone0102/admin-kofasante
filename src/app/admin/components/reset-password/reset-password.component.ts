import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { DataResetPassword } from '../../models/reset-password.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit{
  newPassword!: DataResetPassword;
  pwdIsConfirmed!: boolean;
  success!: boolean;
  isSubmitting!:boolean;

  constructor(
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.newPassword = {
      contactAdmin: sessionStorage.getItem('contactReset'),
      new_password: '',
      confirm_password: ''
    }
    this.pwdIsConfirmed = true;
    this.success = true;
    this.isSubmitting =false;
  }

  onSubmit(){
    this.isSubmitting =true;
    this.authService.resetPassword(this.newPassword).subscribe(
      (data) => {
        this.isSubmitting =false;
        if (data.success){
          this.coreService.goToLogin();
        }else{
          this.success = false;
        }
      },
      (error) => console.log("Error lors de la réinitialisation du mot de passe: "+error)
    )
  }

  onClickConfirmPassword(){
    if(this.newPassword.new_password != this.newPassword.confirm_password){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }

}
