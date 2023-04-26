import { Component } from '@angular/core';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html'
})
export class AddAdminComponent {
  firstName!: string;
  lastName!: string;
  contact!: string;
  password!: string;
  confirmPassword!: string;

  onSubmit(){

  }
}
