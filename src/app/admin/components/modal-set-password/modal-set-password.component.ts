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

  constructor(
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.groupPasswords = {
      contactAdmin: '',
      new_password: '',
      confirm_password: '',
      mdpAdmin: ''
    }  

    this.pwdIsConfirmed = true
  }

  
  onSubmit(){
    this.adminService.updatePassword(this.groupPasswords)
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
