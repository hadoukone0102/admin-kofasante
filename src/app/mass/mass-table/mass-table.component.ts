import { Component } from '@angular/core';
import { lineTableAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-mass-table',
  templateUrl: './mass-table.component.html',
  animations:[
    lineTableAnimation,
  ]
})
export class MassTableComponent {
  
}
