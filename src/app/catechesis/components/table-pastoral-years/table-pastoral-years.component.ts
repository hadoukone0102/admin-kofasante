import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterMassData } from 'src/app/mass/models/filter-model.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-table-pastoral-years',
  templateUrl: './table-pastoral-years.component.html',
  styleUrls: ['./table-pastoral-years.component.css']
})
export class TablePastoralYearsComponent {
  // ~~~~~~~~~~~ Search variables ~~~~~~~~~~ //
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = environment.dateStartForSearch;
  dateEndValue: string = environment.todayDate;
  @Input() maxDate!: string|null;

  // ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
  isRefreshing!: boolean;


  constructor(){}

sendDataToParent(){}


handleToogleButtonFromChild(toogleButton: boolean){
  this.search();
  this.sendDataToParent();
}

  /**
 * result of search
 */
handleDataFilterFromChild(dataFilter: FilterMassData) {
  
  this.searchBarValue = dataFilter.searchBarValue;
  this.dateStartValue = dataFilter.dateStartValue;
  this.dateEndValue = dataFilter.dateEndValue;
  this.search();
  this.sendDataToParent();

}

search(){}
  // function for different boutton
  resetFilter(){}
  export(){}
  MasquerList(){}
  exportToPDF(){}
  exportToExel(){}
  
  
}
