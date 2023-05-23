import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent {
  @Input() isRefreshing: boolean = false;
  @Output() toogleButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  toogleRefresh(){
    console.log("refresh miam");
    
    this.toogleButton.emit(true);
  }

}
