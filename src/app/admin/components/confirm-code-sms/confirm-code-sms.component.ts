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
    console.log("sms code: "+ this.smsCode.verificationCode);
    
    this.authService.sendConfirmationCode(this.smsCode).subscribe(
      (data) => {
        console.log("dans le  send confirm et sucess: "+ data.success);
        
        if(data.success){
          console.log("dans le  send confirm ok");
          this.coreService.goToResetPassword()
        }else{
          console.log("dans le  send confirm ok");
          // this.codeIsValid = false;
        }
      }
    )
    // this.coreService.goToResetPassword();
  }

}
