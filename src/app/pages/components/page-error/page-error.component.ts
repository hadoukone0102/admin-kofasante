import { Component } from '@angular/core';
import { PartialsService } from 'src/app/partials/partials.service';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html'
})
export class PageErrorComponent {
  constructor(private partialsService: PartialsService){}

  goToDashboard(){
    this.partialsService.goToDashboard();
  }
}
