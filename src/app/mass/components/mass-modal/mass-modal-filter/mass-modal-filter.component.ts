import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataFilter } from 'src/app/core/models/filter-model';
import { FilterMassData } from './filter-model.model';

@Component({
  selector: 'app-mass-modal-filter',
  templateUrl: './mass-modal-filter.component.html',
  styleUrls: ['./mass-modal-filter.component.css']
})
export class MassModalFilterComponent {
  @Input() searchBarValue: string = "";
  @Input() dateStartValue: string = "";
  @Input() dateEndValue: string = "";

  dataFilter!: FilterMassData;
  @Output() dataFilterToParent: EventEmitter<FilterMassData> = new EventEmitter<FilterMassData>();

  isSubmitting: boolean = false;

  // ~~~~~~~~~ Today date variables ~~~~~~~~ //
  today: Date = new Date();

  dateIsCorrect!: boolean;

  ngOnInit(): void {
    if (!this.dateStartValue) {
        // Si dateStartValue est vide, utilisez la date par défaut (par exemple, "1/11/2023").
        this.dateStartValue = "2023-11-01";
    }
    if (!this.dateEndValue) {
        // Si dateEndValue est vide, utilisez la date actuelle.
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        this.dateEndValue = `${year}-${month}-${day}`;
    }

    this.dataFilter = {
        searchBarValue: this.searchBarValue,
        dateStartValue: this.dateStartValue,
        dateEndValue: this.dateEndValue
    };

    this.dateIsCorrect = true;
}


  /**
   * Send data to parent component (donationTableComponent)
   * @date 6/5/2023 - 1:59:01 PM
   */
  onSubmit(){
    this.dataFilterToParent.emit(this.dataFilter)
    console.log(this.dataFilterToParent);
    console.log('allah')
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
