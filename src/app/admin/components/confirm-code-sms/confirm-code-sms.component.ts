import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { AuthService } from '../../services/auth.service';
import { DataConfirmCode } from '../../models/confirm-code.model';

@Component({
  selector: 'app-confirm-code-sms',
  templateUrl: './confirm-code-sms.component.html'
})
export class ConfirmCodeSmsComponent implements OnInit{

  smsCode!: DataConfirmCode;
  codeIsValid!: boolean;

  success!: boolean;

  isSubmitting!:boolean;

  constructor(private coreService: CoreService,
    private authService: AuthService
    ){}

    ngOnInit(): void {
      this.smsCode =  {
        verificationCode: ''
      };
      this.codeIsValid = true;
      this.success = true;
    }

  onSubmit(){ 
    this.isSubmitting =true;
    this.success =true;
    this.authService.sendConfirmationCode(this.smsCode).subscribe(
      (data) => {
        if(data.success){
          this.isSubmitting =false;
          this.success =true;
          this.coreService.goToResetPassword();
        }else{
          this.success =false;
          this.isSubmitting =false;
          // this.codeIsValid = false;
        }
      }
    )
    // this.coreService.goToResetPassword();
  }

}
