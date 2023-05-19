import { Component, Input, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { DataProfileInfo } from '../../models/profile-info.model';

@Component({
  selector: 'app-modal-set-info',
  templateUrl: './modal-set-info.component.html'
})
export class ModalSetInfoComponent implements OnInit{
  @Input() adminFirstName!: string|null;
  @Input() adminLastName!: string|null;
  @Input() adminContact!: string|null;
  @Input() adminType!: string|null;

  firstName!: string|null;
  lastName!: string|null;
  profile!: DataProfileInfo;

  isSubmitting!:boolean;

  constructor(
    private adminService: AdminService
  ){}

  ngOnInit(): void {
    this.isSubmitting =false;

    this.profile={
      contactAdmin: sessionStorage.getItem("contact"),
      nomAdmin: this.adminFirstName,
      prenomAdmin: this.adminLastName,
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    this.adminService.updateProfileInfo(this.profile).subscribe(
      data => {
        console.log("come back => "+data.success)
        if(data.success){
          this.isSubmitting =false;
          sessionStorage.setItem('firstName', this.profile.nomAdmin ?? ''); //attribution of default value '' if this. profile.nomAdmin is null
          sessionStorage.setItem('lastName', this.profile.prenomAdmin ?? '');
          location.reload();
        }
        else{
          this.isSubmitting =false;
          console.log("Une erreur s'est produite: "+data.message);
        }
      }
    );
  }
}
