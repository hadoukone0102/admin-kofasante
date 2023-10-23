import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestService } from '../../services/quest.service';
import { Child, FormQuestColumn, Quette } from '../../models/quest-type.model';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterMassData } from 'src/app/mass/models/filter-model.model';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-quest-list-table',
  templateUrl: './quest-list-table.component.html',
  styleUrls: ['./quest-list-table.component.css']
})
export class QuestListTableComponent {
//~~~~~~~~~~~receve data ~~~~~~~~~~~~~~~
@Input() questListParent!:Quette;
// @Input() questType!: string;
@Input() listType!: string; 
questResult!:Array<Child>;
formQuestColumn!: FormQuestColumn;
// ~~~~~~~~~~~~~~~~~~~~ Paginator~~~~~~~~~~~~~~~~~~~~~~~~
isFirstPage!: string;
isLastPage!: string;
newPage!: number;
// ~~~~~~~~~~~ Search variables ~~~~~~~~~~ //
searchTerms =  new Subject<String>();
searchBarValue: string = "";
dateStartValue: string = environment.dateStartForSearch;
dateEndValue: string = environment.todayDate;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~ for modal element ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
@Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
@Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();
// ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
isRefreshing!: boolean;
// ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
styleString: string ='';
pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
pdfTitle: string="Liste des Quêtes";
pdfFileName!: string;
excelFileName: string = "Quêtes";


constructor(
  private questService: QuestService,
){}

ngOnInit():void{
  this.questResult = this.questListParent.quettes;
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
  this.sendDataToParent();//send data to report for update accumulations
}

handleDataColumnFromChild(dataColumn: FormQuestColumn) {
  this.formQuestColumn = dataColumn;
  console.log(this.formQuestColumn);
}

resetFilter(){
  this.searchBarValue = '';
  this.dateStartValue = environment.dateStartForSearch;
  this.dateEndValue = environment.todayDate;
  this.search();
  this.sendDataToParent();//send data to report for update accumulations
}
search(){}
export(){}
MasquerList(){}
goToPrevious(){}
goToNext(){}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~for Exportation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
