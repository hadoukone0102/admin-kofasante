import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataFilter } from '../../models/filter-model';

@Component({
  selector: 'app-modal-filter',
  templateUrl: './modal-filter.component.html',
  styleUrls: ['./modal-filter.component.css']
})
export class ModalFilterComponent implements OnInit{
  @Input() searchBarValue: string = "";
  @Input() dateStartValue: string = "";
  @Input() dateEndValue: string = "";

  dataFilter!: DataFilter;
  @Output() dataFilterToParent: EventEmitter<DataFilter> = new EventEmitter<DataFilter>();

  isSubmitting: boolean = false;

  ngOnInit(): void {
    this.dataFilter = {
      searchBarValue : this.searchBarValue,
      dateStartValue : this.dateStartValue,
      dateEndValue : this.dateEndValue
    }
    
  }

  onSubmit(){
    this.dataFilterToParent.emit(this.dataFilter)
  }

}
