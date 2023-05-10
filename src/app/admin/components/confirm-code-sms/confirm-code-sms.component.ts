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
  
  constructor(private coreService: CoreService,
    private authService: AuthService
    ){}

    ngOnInit(): void {
      this.smsCode =  {
        verificationCode: ''
      };
      this.codeIsValid = true;
    }

  onSubmit(){ 
    this.authService.sendConfirmationCode(this.smsCode).subscribe(
      (data) => {
        if(data.success){
          this.coreService.goToResetPassword()
        }else{
          this.codeIsValid = false;
        }
      }
    )
    this.coreService.goToResetPassword();
  }

}
