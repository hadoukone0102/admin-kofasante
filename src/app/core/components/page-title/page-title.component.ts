import { Component, ContentChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['../../../../assets/css/print.css']
})
export class PageTitleComponent {
  @Input() theModule!: string;
  @Input() theTitle!: string;
  @Input() theContent!: string;

}
