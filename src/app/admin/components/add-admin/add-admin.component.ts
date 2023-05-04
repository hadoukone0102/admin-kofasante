import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html'
})
export class AddAdminComponent implements OnInit {
  firstName!: string;
  lastName!: string;
  contact!: string;
  password!: string;
  confirmPassword!: string;

  pwdIsConfirmed!: boolean;

  ngOnInit(): void {
    this.pwdIsConfirmed = true;
  }

  onSubmit(){

  }

  onClickConfirmPassword(){
    if(this.password != this.confirmPassword){
      this.pwdIsConfirmed = false;
    }
    else{
      this.pwdIsConfirmed = true;
    }
  }
}
