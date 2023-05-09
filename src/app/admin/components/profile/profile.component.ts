import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
  adminFirstName!: string|null;
  adminLastName!: string|null;
  adminContact!: string|null;
  adminType!: string|null;

  ngOnInit(): void {
    this.adminFirstName = sessionStorage.getItem('firstName');
    this.adminLastName = sessionStorage.getItem('lastName');
    this.adminContact = sessionStorage.getItem('contact');
    this.adminType = sessionStorage.getItem('type');
  }

}
