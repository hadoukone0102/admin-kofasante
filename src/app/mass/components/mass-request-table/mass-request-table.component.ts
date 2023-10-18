import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { ChildMassRequest, MassRequest, Masses } from '../mass-request-models/mass-request.model';
import { MassRequestService } from '../mass-request-services/mass-request.service';
import { Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterMassData } from '../mass-modal/mass-modal-filter/filter-model.model';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-mass-request-table',
  templateUrl: './mass-request-table.component.html'
})
export class MassRequestTableComponent {
  // ~~~~~~~~~~~~~~~Model mass request~~~~~~~~~~~~~~~~~~
  @Input() massRequests!:MassRequest;

  @Input() Masses!:ChildMassRequest;
 
  childMassRequests: ChildMassRequest[]=[];

  // ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;

  // ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
  isRefreshing!: boolean;
  // ~~~~~~~~~~~ Search variables ~~~~~~~~~~ //
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = environment.dateStartForSearch;
  dateEndValue: string = environment.todayDate;
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ for modal element ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();
// ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
styleString: string ='';
isExporting!: boolean;
pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
pdfTitle: string="Liste des Demandes de Messe";
pdfFileName!: string;
excelFileName: string = "Demande-noAnonyme";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@Input() messeListParent!: MassRequest;
@Input() listType!: string; 

  // ~~~~~~~~~~ Donation variables ~~~~~~~~~ //
  messe$!: Observable<MassRequest>;
  // donationTest$!: Observable<DataDon>;
  // donationListTest!: Array<ChildMassRequest>;
  messeList!: Array<ChildMassRequest>;

  constructor(
    private coreService: CoreService,
    private massRequestService: MassRequestService,
    private route: ActivatedRoute,
    ){}

    ngOnInit(){
      this.sendDataToParent();
      this.route.data.pipe(map(data=>data['massNoAnonymousRequestResolver']))
        .subscribe((data)=>{
          this.massRequests = data;  
          console.log(this.massRequests.demande_messe);
        }
        );

        this.messeList = this.messeListParent.demande_messe;
        
      // this.massRequestService.getMassRequests().subscribe(
      //   (data)=>{
      //     this.massRequests = data;  
      //     console.log(this.massRequests.demande_messe);
      //   }
      // )
      this.massRequestService.getMass().subscribe(
        (data)=>{
          this.Masses = data;
          console.log(this.Masses.masses);
          }
      )
      this.checkAndApplyDisabled(this.massRequests);
    }
    
    getUniqueDates(dates: string[]): string[] {
      return Array.from(new Set(dates)); //    Utilisez un ensemble pour garantir des dates uniques
    }    

    goToEditMass(id: number){
    this.coreService.goToEditMass(id);
  }

  /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 10/08/2023 - 17:00:43 PM
   *
   * @param {DataDon} data
   */
  checkAndApplyDisabled(data: MassRequest){
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
   * @date 
   */
   goToPrevious(){
    this.showPageWhere(-1);
  }
  
  /**
   * Go to next page of table
   * @date 
   */
  goToNext(){
    this.showPageWhere(1);
  }

  /**
   * Get the data matching of the current page of pagination
   * @date 
   *
   * @param {number} pageIndex
   */
  showPageWhere(pageIndex: number){
    this.newPage= this.massRequests.current_page + pageIndex;

    this.massRequestService.getMassRequests().subscribe(
      (data)=>{
        this.massRequests = data;  
        this.checkAndApplyDisabled(data);
      }
    )
  }

  goToAnonymousMassRequest(){
    this.coreService.goToAnonymousMassRequest();
  }


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~for Search ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
resetFilter(){
    this.searchBarValue = '';
    this.dateStartValue = environment.dateStartForSearch;
    this.dateEndValue = environment.todayDate;
    this.search();
    this.sendDataToParent();//send data to report for update accumulations
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

  handleToogleButtonFromChild(toogleButton: boolean){
    this.search();
    this.sendDataToParent(); //send data to report for update accumulations
  }

  export(){

  }

  search() {
    // this.hideExportationButton();
    this.sendDataToParent();
    this.isRefreshing = true;

    this.massRequestService.searchMassRequests(this.searchBarValue, this.dateStartValue, this.dateEndValue)
      .subscribe((data) => {
        this.massRequests = data;
        this.checkAndApplyDisabled(data);
        this.isRefreshing = false;
      });
  }
  
/**
 * result of search
 */
handleDataFilterFromChild(dataFilter: FilterMassData) {
  this.searchBarValue = dataFilter.searchBarValue;
  this.dateStartValue = dataFilter.dateStartValue;
  this.dateEndValue = dataFilter.dateEndValue;
  this.search();
  this.sendDataToParent();//send data to report for update accumulations
}


   /**
   * Export data from table to PDF
   * @date 5/17/2023 - 12:40:46 PM
   */
 // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fonction pour exporter en PDF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 exportToPDF() {
  if (this.pdfTitle) {
    // Create a new instance of jsPDF with the specified orientation
    let doc = new jsPDF({ orientation: this.pdfOrientation });
    
    let titleSize = 20;
    let textWidth = doc.getStringUnitWidth(this.pdfTitle) * titleSize / doc.internal.scaleFactor;
    let margin = (doc.internal.pageSize.width - textWidth) / 2;

    // ~~~~~~~~~~~~~~~~ HEADER ~~~~~~~~~~~~~~~
    let logoImg = new Image();
    logoImg.src = 'assets/images/logo.png';
    let xPosition = 15;
    let yPosition = 10;
    let imageWidth = 23;
    let imageHeight = 25;
    let textYPosition = yPosition + (imageHeight / 2) + (titleSize / 4);

    doc.addImage(logoImg, 'PNG', xPosition, yPosition, imageWidth, imageHeight);

    doc.setFontSize(30);
    doc.setFont('Roboto', 'bold');
    doc.text("Eglise Mukasa", margin, textYPosition);

    // ~~~~~~~~~~~~~~ END HEADER ~~~~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~ TITLE ~~~~~~~~~~~~~~~~
    doc.setFontSize(titleSize);
    doc.setFont('Roboto', 'bold');
    doc.text(this.pdfTitle, margin, 45);
    // ~~~~~~~~~~~~~~ END TITLE ~~~~~~~~~~~~~~

    // ~~~~~~~~~~~~ TABLE CONTENT ~~~~~~~~~~~~
    autoTable(doc, { html: "#exportTable", theme: "striped", startY: 60, showFoot: "everyPage" });
    // ~~~~~~~~~~ END TABLE CONTENT ~~~~~~~~~~

    // ~~~~~~~~~~~~~~~~ FOOTER ~~~~~~~~~~~~~~~
    let footerText = "PAROISSE SAINT-JOSEPH-MUKASA-BALIKUDDEMBE";
    let footerFontSize = 10;
    let footerMargin = 10;
    let pageNumber = 1;

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
    // ~~~~~~~~~~~~~~ END FOOTER ~~~~~~~~~~~~~

    doc.save(this.pdfFileName);
  } else {
    // Gérez le cas où this.pdfTitle est indéfini ou incorrect, par exemple en utilisant un titre par défaut.
    console.error("Le titre du PDF est indéfini ou incorrect.");
  }
}
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Fin de la fonction pour exporter en PDF ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
}
