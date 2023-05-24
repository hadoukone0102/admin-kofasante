import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, takeWhile } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { DonationService } from '../../services/donation.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { linePaginateAnimation,  } from 'src/app/core/animations/animations';
import { DataFilter } from 'src/app/core/models/filter-model';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  animations:[
    linePaginateAnimation
  ]
  
})
export class DonationTableComponent implements OnInit{
  
  // ~~~~~~~~~~ Donation variables ~~~~~~~~~ //
  donations$!: Observable<DataDon>;
  donationTest$!: Observable<DataDon>;
  donationListTest!: Array<Don>;
  donationList!: Array<Don>;
  
  // ~~~~~~~~~~ Decorated variables ~~~~~~~~~ //
  @Input() donationListParent!: DataDon;
  @Input() listType!: string; //ano ? perso ? orga ? all ? failed
  @Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();

  // ~~~~~~~~~~~ Search variables ~~~~~~~~~~ //
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = "";
  dateEndValue: string = "";

  // ~~~~~~~~~~ Boolean variables ~~~~~~~~~~ //
  dateIsCorrect!: boolean;
  isAnonymous!: boolean;
  isOrganisation!: boolean;
  isAll!: boolean;
  isFailed!: boolean;
  noData!: boolean;

  // ~~~~~~~~~ Pagination variables ~~~~~~~~ //
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;
  
  // ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
  styleString: string ='';
  isExporting!: boolean;
  pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
  pdfTitle!: string;
  pdfFileName!: string;
  excelFileName!: string;

  // ~~~~~~~~~ Today date variables ~~~~~~~~ //
  today: Date = new Date();

  // ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
  isRefreshing!: boolean;
  
  constructor(
    private donationService: DonationService,
    ) {}

  ngOnInit(): void {
    //Show correct table for donnation
    this.showTableOfType(this.listType); 
    this.donationList = this.donationListParent.dons;
    this.checkAndApplyDisabled(this.donationListParent); 

    // ~~~ search variables initialization ~~~ //
    this.dateEndValue = environment.todayDate;
    this.dateStartValue = environment.dateStartForSearch;
    this.dateIsCorrect = true;
    
    this.sendDataToParent();
    this.search(); //to make work the first (change) after loading page
    
    // ~~~~ Print variables Initialization ~~~ //
    this.isExporting = false;
    this.pdfOrientation ='p';
    this.pdfTitle ='';
    this.pdfFileName = '';
    this.excelFileName = '';

    this.isRefreshing = false;
  }

  // ====================================================== //
  // ============= //ANCHOR - Parent Fonctions ============ //
  // ====================================================== //

  /**
   * Export data from table to PDF
   * @date 5/17/2023 - 12:40:46 PM
   */
  exportToPDF() {
    let doc = new jsPDF({ orientation: this.pdfOrientation }); // Create a new instance of jsPDF with the specified orientation
    
    let titleSize = 20; // Set the size of the title text
    let textWidth = doc.getStringUnitWidth(this.pdfTitle) * titleSize / doc.internal.scaleFactor; // Calculate the width of the title text in the document
    let margin = (doc.internal.pageSize.width - textWidth) / 2;  // Calculate the margin to center the title horizontally
  
    // Set the font size and style for the title
    doc.setFontSize(titleSize);
    doc.setFont('Roboto', 'bold');
    doc.text(this.pdfTitle, margin, 20); // Add the title to the document at the calculated position
  
    // Use the autoTable plugin to generate a table from the HTML element with the id "exportTable"
    autoTable(doc, { html: "#exportTable", theme: "grid", startY: 30 });
    doc.save(this.pdfFileName);// Save the generated PDF file with the specified file name
  }
  

  /**
   * Export data from table to Excel
   * @date 5/17/2023 - 12:41:09 PM
   */
  exportToExel(){
       /* pass here the table id */
       let element = document.getElementById('exportTable');
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    
       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
       /* save to file */  
       XLSX.writeFile(wb, this.excelFileName);
  }

  /**
   * Show table matching donation type
   * @date 5/17/2023 - 12:50:42 PM
   *
   * @param {string} type
   */
  showTableOfType(type: string){
    if(type === "anonymous"){
      this.showAnonymous();
    }
    else if(type === "noAnonymousPerso"){
      this.showNoAnonymousPerso();
    }
    else if(type === "noAnonymousOrga"){
      this.showNoAnonymousOrga();
    }
    else{// all
      this.showAll();
    }
  }

  /**
   * Go to previous page of table
   * @date 5/17/2023 - 12:51:29 PM
   */
  goToPrevious(){
    this.showPageWhere(-1);
  }
  
  /**
   * Go to next page of table
   * @date 5/17/2023 - 12:52:23 PM
   */
  goToNext(){
    this.showPageWhere(1);
  }

  handleToogleButtonFromChild(toogleButton: boolean){
    this.search();
  }

  handleDataFilterFromChild(dataFilter: DataFilter) {
    this.searchBarValue = dataFilter.searchBarValue;
    this.dateStartValue = dataFilter.dateStartValue
    this.dateEndValue = dataFilter.dateEndValue
    this.search();
  }
 

  // ====================================================== //
  // ============= //ANCHOR - Child Fonctions ============= //
  // ====================================================== //
   
   /**
    * Show all data matching filter criteria without pagination for exportation
    * @date 5/17/2023 - 12:42:01 PM
    */
   export(){
    //clear table
    this.donationList = [];
    this.donationListParent = {
      status: '',
      status_code: 0,
      status_message: '',
      current_page: 0,
      last_page: -1,
      dons: []

    }

    if(this.listType === "anonymous"){
      this.donationTest$ =  this.donationService.getAllDonationsAnonymousWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
      this.pdfOrientation = 'portrait';
      this.pdfTitle = 'Liste des dons anonyme';
      this.pdfFileName = 'liste_des_dons_anonyme.pdf';
      this.excelFileName = 'liste_des_dons_anonyme.xlsx';
    }
    else if(this.listType === "noAnonymousPerso")
    {
      this.donationTest$ =  this.donationService.getAllDonationsNoAnonymousPersoWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
      this.pdfOrientation = 'landscape';
      this.pdfTitle = 'Liste des dons non anonyme faits à titre personnel';
      this.pdfFileName = 'Dons_non_anonyme_personnel.pdf';
      this.excelFileName = 'Dons_non_anonyme_personnel.xlsx';
    }
    else if(this.listType === "noAnonymousOrga")
    {
      this.donationTest$ =  this.donationService.getAllDonationsNoAnonymousOrgaWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
      this.pdfOrientation = 'landscape';
      this.pdfTitle = 'Liste des dons non anonyme faits par des organisation';
      this.pdfFileName = 'Dons_non_anonyme_organisation.pdf';
      this.excelFileName = 'Dons_non_anonyme_organisation.xlsx';
    }
    else //all
    {
      this.donationTest$ = this.donationService.getAllDonationsWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
      this.pdfOrientation = 'landscape';
      this.pdfTitle = 'Liste de tout les dons';
      this.pdfFileName = 'Liste_complète_des_dons.pdf';
      this.excelFileName = 'Liste_complète_des_dons.xlsx';
    }

    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
      this.isExporting = true;

    });
  }

  /**
   * Get data matching filter criteria
   * @date 5/17/2023 - 12:48:54 PM
   */
  search(){
    this.hideExportationButton();
    this.sendDataToParent();
    this.isRefreshing = true;
    if (this.listType === "anonymous") {//Anonymous
      this.searchTerms.next(this.searchBarValue);
  
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        switchMap((term) => this.donationService.getDonationsAnonymousWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }
    else if(this.listType === "noAnonymousPerso") //non-anonymous perso
    {
      this.searchTerms.next(this.searchBarValue);
        this.donations$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => this.donationService.getDonationsNoAnonymousPersoWhere('1',term, this.dateStartValue, this.dateEndValue))
        );
    }
    else if(this.listType === "noAnonymousOrga")//non-anonymous orga
    {
      this.searchTerms.next(this.searchBarValue);
    
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.getDonationsNoAnonymousOrgaWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }
    else if(this.listType === "all")
    { 
      this.searchTerms.next(this.searchBarValue);
    
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.getDonationsWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }
    else{//failed
      this.searchTerms.next(this.searchBarValue);
    
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.getDonationsFailedWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }

    //Getting data from API depending filter criteria
    this.donations$.subscribe((donations) => {
      this.donationList = donations.dons;
      this.donationListParent = donations;
      this.checkAndApplyDisabled(donations);
      this.isRefreshing = false;
    });
  }

  /**
   * Get the data matching of the current page of pagination
   * @date 5/17/2023 - 12:52:37 PM
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.donationListParent.current_page + pageIndex;

    if(this.listType === "anonymous"){
      this.donationTest$ =  this.donationService.getDonationsAnonymousWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else if(this.listType === "noAnonymousPerso")
    {
      this.donationTest$ =  this.donationService.getDonationsNoAnonymousPersoWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else if(this.listType === "noAnonymousOrga")
    {
      this.donationTest$ =  this.donationService.getDonationsNoAnonymousOrgaWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else if(this.listType === "all")
    {
      this.donationTest$ = this.donationService.getDonationsWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else{//failed
      this.donationTest$ = this.donationService.getDonationsFailedWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    
    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
      
    });
  }

  /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 5/17/2023 - 1:00:43 PM
   *
   * @param {DataDon} donationListParenta
   */
  checkAndApplyDisabled(donationListParenta: DataDon){
    //NOTE - "1" means that it should be disabled and "..." that it should be enabled
    if((donationListParenta.current_page === 1) && (donationListParenta.current_page != donationListParenta.last_page)){
      //("1/...")
      
      this.isFirstPage = "disabled";
      this.isLastPage = "";
    }else{
      if((donationListParenta.current_page === 1) && (donationListParenta.current_page === donationListParenta.last_page)){
        //("1/1")
        this.isFirstPage = "disabled";
        this.isLastPage = "disabled";
      }
      else{
        if((donationListParenta.current_page != 1) && (donationListParenta.current_page != donationListParenta.last_page)){
          //(".../...")
          this.isFirstPage  = "";
          this.isLastPage = "";
        }
        else{
            //(".../1")
            this.isFirstPage  = "";
            this.isLastPage = "disabled";
        }
      }
    }
  }

  /**
   * Send filter data to parent component
   * @date 5/17/2023 - 12:45:20 PM
   */
  sendDataToParent(){
    this.searchBarValueToParent.emit(this.searchBarValue);
    this.dateStartValueToParent.emit(this.dateStartValue);
    this.dateEndValueToParent.emit(this.dateEndValue);
  }

  /**
   * Allows to display only columns for the list of anonymous donatitons
   * @date 5/17/2023 - 12:55:09 PM
   */
  showAnonymous(){
    this.isAnonymous = true;
  }

  /**
   * Allows to display only columns for the list of non-anonymous donatitons made 
   * on a personal basis
   * @date 5/17/2023 - 12:58:07 PM
   */
  showNoAnonymousPerso(){
    this.isAnonymous = false;
    this.isOrganisation = false;
  }

  /**
   * Allows to display only columns for the list of non-anonymous donatitons made by organizations
   * @date 5/17/2023 - 12:59:34 PM
   */
  showNoAnonymousOrga(){
    this.isAnonymous = false;
    this.isOrganisation = true;
  }

  /**
   * Hide  exportation button
   * @date 5/17/2023 - 12:40:21 PM
   */
  hideExportationButton(){
    this.isExporting =false;
  }

  /**
   * Allows to display all columns for the list of all donation types
   * @date 5/17/2023 - 12:59:53 PM
   */
  showAll(){
    this.isAnonymous = false;
    this.isOrganisation = true;
    this.isAll = true;
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
   * Returns false if we are not in the donation report page 
   * @date 5/17/2023 - 12:33:49 PM
   *
   * @returns {boolean}
   */
  /*isNotReporter(): boolean {
    if (this.router.url === "/dons/bilan-don"){
      return false;
    }else{
      return true;
    }
  }*/
}
