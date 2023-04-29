import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/core.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
  constructor(private coreService: CoreService){}

  goToDashboard(){
    this.coreService.goToDashboard();
  }
}
