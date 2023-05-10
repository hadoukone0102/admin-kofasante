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

  constructor(
    private coreService: CoreService,
    private authService: AuthService
    ){}

  ngOnInit(): void {
    this.newPassword.contactAdmin = sessionStorage.getItem('contactReset');
  }

  onSubmit(){
    this.authService.resetPassword(this.newPassword).subscribe(
      (data) => this.coreService.goToLogin(),
      (error) => console.log("Error lors de la réinitialisation du mot de passe: "+error)
    )
  }

}
