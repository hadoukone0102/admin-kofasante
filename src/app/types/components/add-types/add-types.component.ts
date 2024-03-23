import { Component } from '@angular/core';
import { TypeService } from '../../services/type.service';
import { AjouterType } from '../../Models/types';

@Component({
  selector: 'app-add-types',
  templateUrl: './add-types.component.html',
  styleUrls: ['./add-types.component.css']
})
export class AddTypesComponent {

  MediaSend!:AjouterType;
  showmessage:boolean=false;
  showmessageDanger:boolean= false;
  showSpinner!:boolean;

  constructor(private typeService : TypeService,){}

  ngOnInit():void{
    this.MediaSend ={
      service:"",
      type_service:"",
      desc:""
    }
  }

  message1:string = "";
  message2:string = "";
  AjouterUnType() {
    this.typeService.AjouterUnType(this.MediaSend).subscribe(
      (data) => {
        this.showSpinner = false;
        this.showmessage = true;
        this.message1 = data.message;
      },
      (error) => {
        this.showSpinner = false;
        this.showmessageDanger = true;
        this.message2 = error.message;
      }
    );
  }

}
