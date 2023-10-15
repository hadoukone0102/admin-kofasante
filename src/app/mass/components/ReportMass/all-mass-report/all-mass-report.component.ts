import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterMassData } from '../../mass-modal/mass-modal-filter/filter-model.model';
import { CoreService } from 'src/app/core/services/core.service';
import { MassService} from '../../../services/mass.service'
import { Basket } from 'src/app/mass/models/basket.model';
import { ChildMassRequest, MassRequest, anonymosMass } from '../../mass-request-models/mass-request.model';
import { MassRequestService } from '../../mass-request-services/mass-request.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { MassReport, AllMassRequest } from '../models/mass-report-model.model';
import { MassReportServicesService } from '../../ReportMass/services/mass-report-services.service'
import { linePaginateAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-all-mass-report',
  templateUrl: './all-mass-report.component.html',
  styleUrls: ['./all-mass-report.component.css'],
  animations:[
    linePaginateAnimation
  ]
})
export class AllMassReportComponent {
  allMass!:AllMassRequest;
  // ~~~~~~~~~ Pagination variables ~~~~~~~~ //
  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  searchBarValue: string = "";
  dateStartValue: string = "";
  dateEndValue: string = "";
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~ for modal element ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  @Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();
  // ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
  // ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
styleString: string ='';
isExporting!: boolean;
pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
pdfTitle: string ='Liste des demandes des Messes';
pdfFileName!: string;
excelFileName: string = "Demande-noAnonyme";
  isRefreshing!: boolean;

  constructor(
    private massrservices: MassReportServicesService,
  ){}

  ngOnInit(){
    this.massrservices.getAllMassRequest().subscribe(
      (data)=>{
        this.allMass = data;
        this.checkAndApplyDisabled(data);
      }
    )
    this.checkAndApplyDisabled(this.allMass);
  }

    /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 10/08/2023 - 17:00:43 PM
   *
   * @param {DataDon} data
   */
    checkAndApplyDisabled(data: AllMassRequest){
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
   * @date 13/10/2023
   * for changing page
   * getMassDataForPage() is service
   */

  goToPrevious() {
    if (this.allMass.current_page > 1) {
      // Calculer le numéro de page précédent
      const previousPage = this.allMass.current_page - 1;
  
      // Appeler la méthode pour récupérer les données de la page précédente
      this.massrservices.getMassDataForPage(previousPage).subscribe(data => {
        this.allMass = data;
        this.checkAndApplyDisabled(data);
      });
    }
  }
   /**
    * @date 13/10/2023
   * for changing page
   * getMassDataForPage() is service
   */

 /**
    * @date 13/10/2023
   * for changing page
   * getMassDataForPage() is service
   */

 goToNext() {
  if (this.allMass.current_page < this.allMass.last_page) {
      // Effectuer une requête pour charger la page suivante
      this.allMass.current_page += 1;
      this.checkAndApplyDisabled(this.allMass);

      // Appeler la méthode pour récupérer les données de la nouvelle page
      this.loadDataForCurrentPage(this.allMass.current_page);
  }
}
/**
 * @date 13/10/2023
 * @param page number of current page
 */
loadDataForCurrentPage(page: number) {
  this.massrservices.getMassDataForPage(page).subscribe((data) => {
      this.allMass = data;
  });

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~for Search ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  /**
   * @date 13/10/2023
   */
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

  search() {
    // this.hideExportationButton();
    this.sendDataToParent();
    this.isRefreshing = true;

    this.massrservices.searchBasketMass(this.searchBarValue, this.dateStartValue, this.dateEndValue)
      .subscribe((data) => {
        this.allMass = data;
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

Export:boolean= false;
ActionExport(){
  this.Export = true;
}

}