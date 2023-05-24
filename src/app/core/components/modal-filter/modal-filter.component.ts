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

  // ~~~~~~~~~ Today date variables ~~~~~~~~ //
  today: Date = new Date();

  dateIsCorrect!: boolean;

  ngOnInit(): void {
    this.dataFilter = {
      searchBarValue : this.searchBarValue,
      dateStartValue : this.dateStartValue,
      dateEndValue : this.dateEndValue
    }
    this.dateIsCorrect = true;
  }

  onSubmit(){
    this.dataFilterToParent.emit(this.dataFilter)
  }

  /**
   * Convert string too date
   * @date 5/17/2023 - 12:33:23 PM
   *
   * @param {string} date
   * @returns {Date}
   */
  convertStringToDate(date : string): Date{
    return new Date(date);
  }

   /**
   * Check if the start date field value is lower than the end date field value
   * before searching
   * @date 5/17/2023 - 12:46:43 PM
   */
   startIsLessThanEnd(){
    const dateStart = new Date(this.dataFilter.dateStartValue);
    const dateEnd = new Date(this.dataFilter.dateEndValue);
    
    if(dateStart > dateEnd){
      this.dateIsCorrect = false;
    }else{
      this.dateIsCorrect = true;
    }
  }

}
