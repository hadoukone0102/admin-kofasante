import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { linePaginateAnimation, lineTableAnimation } from 'src/app/core/animations/animations';
import { CoreService } from 'src/app/core/services/core.service';
import { MassModel } from '../../models/mass.model';
import { MassService } from '../../services/mass.service';
import { DataDon } from 'src/app/donation/models/don.model';
import { Subject } from 'rxjs';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';
import { DataFilter } from 'src/app/core/models/filter-model';

@Component({
  selector: 'app-mass-table',
  templateUrl: './mass-table.component.html',
  animations:[
    linePaginateAnimation,
  ]
})
export class MassTableComponent implements OnInit{
  // ~~~~~~~~~~ Decorated variables ~~~~~~~~~ //
  @Input() donationListParent!: DataDon;
  @Input() maxDate!: string; //ano ? perso ? orga ? all ? failed
  @Input() listType!: string; //ano ? perso ? orga ? all ? failed
  @Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();

  @Input() massModel!: MassModel;

  // ~~~~~~~~~~~ Search variables ~~~~~~~~~~ //
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = environment.dateStartForSearch;
  dateEndValue: string = "";
  dateIsCorrect: boolean = true;

  today: string = environment.todayDate;
  
  // ~~~~~~~~~ Pagination variables ~~~~~~~~ //
  isFirstPage!: string;
  isLastPage!: string;
  newPage: number = 1;

  // ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
  styleString: string ='';
  isExporting!: boolean;
  pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
  pdfTitle!: string;
  pdfFileName!: string;
  excelFileName!: string;

  // ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
  isRefreshing!: boolean;

  spinner: boolean = false;
  // ~~~~~~~~~~~~ Error message ~~~~~~~~~~~~ //
  pageHasError: boolean = false;
  errorMessage!: string;

  constructor(
    private coreService: CoreService,
    private massService: MassService
    ){}

  ngOnInit(): void {
    this.checkAndApplyDisabled(this.massModel);
    
    console.table(this.massModel.masses);
    this.dateEndValue = this.maxDate;
    console.log("maxdate: "+this.maxDate);
  }
  

  goToEditMass(id: number){
    this.coreService.goToEditMass(id);
  }

  deleteMassDay(id: number){
    if(confirm("Êtes vous sûr de vouloir Supprimer ce jour de messe et toutes les messes à l'intérieur ?")){
      this.pageHasError = false;
    this.massService.deleteMassDay(id).subscribe(
      (data) => {
        if (data.success) {
          this.massService.getMassesList(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
          .subscribe((data) => {
            this.massModel = data;
          })
        }else{
          this.pageHasError = true;
          this.errorMessage = data.message;
        }
      }
    )
    }
  }

  
  

  trackById(index: number, data: any): number {
    return data.days_id; // Remplacez "id" par la propriété unique de votre administrateur
  }

  // ====================================================== //
  // ================= //ANCHOR - FILTER ================== //
  // ====================================================== //
  resetFilter(){
    this.getMaxDate()
    this.searchBarValue = '';
    this.dateStartValue = environment.dateStartForSearch;
    this.dateEndValue = this.maxDate;

    this.search();
    //this.sendDataToParent();//send data to report for update accumulations
  }

  search(){
    this.isRefreshing = true;
    this.isExporting = false;
    this.massService.getMassesList("1",this.searchBarValue ,this.dateStartValue, this.dateEndValue).subscribe(
      (data) => {
        this.massModel = data;
        this.checkAndApplyDisabled(data);
        this.isRefreshing = false;
      }
    );
  }

  handleToogleButtonFromChild(toogleButton: boolean){
    this.search();
    //this.sendDataToParent(); //send data to report for update accumulations
  }

  handleDataFilterFromChild(dataFilter: DataFilter) {
    this.searchBarValue = dataFilter.searchBarValue;
    this.dateStartValue = dataFilter.dateStartValue;
    this.dateEndValue = dataFilter.dateEndValue;
    this.search();
    console.log(dataFilter);
    
    // this.sendDataToParent();//send data to report for update accumulations
  }

  getMaxDate(){
    let maxDate: Date | null = null;
    this.massService.getMassesList().subscribe(
      (data) => {
        // Parcourez les données pour trouver la date maximale
        data.masses.forEach((massDayData) => {
            const currentDate = new Date(massDayData.days);
    
            if (maxDate === null || currentDate > maxDate) {
              maxDate = currentDate;
            }
          });
          this.maxDate = maxDate!.toISOString().substring(0, 10);
    
          console.log("La date maximale est :", maxDate!.toISOString().substring(0, 10));
      }
    )
    }

  // ====================================================== //
  // ================== //ANCHOR - PRINT ================== //
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
    
    // ~~~~~~~~~~~~~~~~ HEADER ~~~~~~~~~~~~~~~ //
    let logoImg = new Image();
    logoImg.src = 'assets/images/logo.png';
    let xPosition = 15; // X position of the image
    let yPosition = 10; // Y position of the image
    let imageWidth = 23; // Width of the image
    let imageHeight = 25; // Height of the image
    let textYPosition = yPosition + (imageHeight / 2) + (titleSize / 4); // Y position of the title text

    doc.addImage(logoImg, 'PNG', xPosition, yPosition, imageWidth, imageHeight);
  
    doc.setFontSize(30);
    doc.setFont('Roboto', 'bold');
    doc.text("Eglise Mukasa", margin, textYPosition); // Add the title to the document at the calculated position
    // ~~~~~~~~~~~~~~ END HEADER ~~~~~~~~~~~~~ //

    // ~~~~~~~~~~~~~~~~ TITLE ~~~~~~~~~~~~~~~~ //
    // Set the font size and style for the title
    doc.setFontSize(titleSize);
    doc.setFont('Roboto', 'bold');
    doc.text(this.pdfTitle, margin, 45); // Add the title to the document at the calculated position
    // ~~~~~~~~~~~~~~ END TITLE ~~~~~~~~~~~~~~ //

    // ~~~~~~~~~~~~ TABLE CONTENT ~~~~~~~~~~~~ //
    // Use the autoTable plugin to generate a table from the HTML element with the id "exportTable"
    autoTable(doc, { html: "#exportTable", theme: "striped", startY: 60, showFoot: "everyPage" });
    // ~~~~~~~~~~ END TABLE CONTENT ~~~~~~~~~~ //

    // ~~~~~~~~~~~~~~~~ FOOTER ~~~~~~~~~~~~~~~ //
    let footerText = "PAROISSE SAINT-JOSEPH-MUKASA-BALIKUDDEMBE";
    let footerFontSize = 10;
    let footerMargin = 10;
    let pageNumber = 1;

    //Funciton to add footer to each page
    function addFooter() {
      let pageCount = doc.getNumberOfPages();
    
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(footerFontSize);
        doc.text(footerText, footerMargin, doc.internal.pageSize.height - footerMargin);
        doc.text("Page " + pageNumber, doc.internal.pageSize.width - footerMargin, doc.internal.pageSize.height - footerMargin, { align: "right" });
        doc.text("", footerMargin, doc.internal.pageSize.height - footerMargin, { align: "left" });
        pageNumber++;
      }
    }
    addFooter(); 
    // ~~~~~~~~~~~~~~ END FOOTER ~~~~~~~~~~~~~ //

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
    * Show all data matching filter criteria without pagination for exportation
    * @date 5/17/2023 - 12:42:01 PM
    */
  export(){
    this.massModel.masses = [];
    this.isExporting = true;
    this.spinner = true;

    this.pdfOrientation = 'portrait';
    this.pdfTitle = 'Liste des messes';
    this.pdfFileName = 'liste_des_messes.pdf';
    this.excelFileName = 'liste_des_messes.xlsx';

    this.massService.getMassesFullList(this.searchBarValue, this.dateStartValue, this.dateEndValue).subscribe(
      (data) => {
        this.massModel = data;
        this.checkAndApplyDisabled(data);
        this.spinner = false;
        // this.isExporting = false;
      }
    )

    // this.donationTest$.subscribe((data) => {
    //   this.donationList = data.dons;
    //   this.donationListParent =  data;
    //   this.checkAndApplyDisabled(data);
    //   this.isExporting = true;

    // });
  }



  // ====================================================== //
  // ================ //ANCHOR - PAGINATION =============== //
  // ====================================================== //

  /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 5/17/2023 - 1:00:43 PM
   *
   * @param {DataDon} data
   */
  checkAndApplyDisabled(data: MassModel){
    //NOTE - "1" means that it should be disabled and "..." that it should be enabled
    if((data.current_page === 1) && (data.current_page != data.last_page)){
      //("1/...")
      
      this.isFirstPage = "disabled";
      this.isLastPage = "";
    }else{
      if((data.current_page === 1) && (data.current_page === data.last_page)){
        //("1/1")
        this.isFirstPage = "disabled";
        this.isLastPage = "disabled";
      }
      else{
        if((data.current_page != 1) && (data.current_page != data.last_page)){
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
   * Go to previous page of table
   * @date 5/17/2023 - 12:51:29 M
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

  /**
   * Get the data matching of the current page of pagination
   * @date 5/17/2023 - 12:52:37 PM
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.massModel.current_page + pageIndex;

    this.massService.getMassesList(this.newPage.toString()).subscribe(
      (data)=>{
        this.massModel = data;  
        this.checkAndApplyDisabled(data);
      }
    )
  }
}
