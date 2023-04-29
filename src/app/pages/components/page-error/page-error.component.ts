import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html'
})
export class PageErrorComponent {
  constructor(private coreService: CoreService){}

  goToDashboard(){
    this.coreService.goToDashboard();
  }
}
