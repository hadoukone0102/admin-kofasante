import { Component } from '@angular/core';
import { PartialsService } from 'src/app/partials/partials.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent {
  constructor(private partialsService: PartialsService){}

  goToDashboard(){
    this.partialsService.goToDashboard();
  }
}
