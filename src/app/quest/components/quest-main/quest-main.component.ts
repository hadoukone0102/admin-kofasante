import { Component, EventEmitter, Input, Output } from '@angular/core';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FilterMassData } from 'src/app/mass/models/filter-model.model';
import { environment } from 'src/environments/environment';
import { QuestOriginal, QuestOriginalChild, FormQuestColumn, Quest, Quette, Child } from '../../models/quest-type.model';
import { QuestService } from '../../services/quest.service';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';

@Component({
  selector: 'app-quest-main',
  templateUrl: './quest-main.component.html',
  styleUrls: ['./quest-main.component.css'],
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class QuestMainComponent {
  //~~~~~~~~~~~receve data ~~~~~~~~~~~~~~~

// @Input() questListParent!:Quette;
// @Input() questType!: string;
// questResult!:Array<Child>;

// ~~~~~~~~~~ quest variables ~~~~~~~~~ //
quest$!: Observable<Quette>;
questTest$!: Observable<Quette>;
questListTest!: Array<Child>;
questList!: Array<Child>;

@Input() questListParent!:Quette;
@Input() listType!: string;
 ModalComponent$!:Observable<Child>;
questResult!:Array<Child>;
formQuestColumn!: FormQuestColumn;
MyQuest!:Array<Quest>

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
//~~~~~~~~~~~~~~~~~~~~~~~boolean~~~~~~~~~~~~~~~~~~~~~~~~é
isExporting!: boolean;
showBtnExport:boolean = false;
 //~~~~~~~~~~~~~~~~~~~~~~~ for modal notification ~~~~~~~~~~~~~~~~ééé
 messe_id!: number;
 days!: string;
 total_Quest!:string;
@Output() modalQuestToParent: EventEmitter<QuestOriginalChild> = new EventEmitter<QuestOriginalChild>;

constructor(
  private questService: QuestService,
){}

ngOnInit():void{
  this.ShowSheckData();
  this.questResult = this.questListParent.quettes;
}

 /**
   * Disable or enable the buttons to go to the next or previous page 
   * depending on the current and last page
   * @date 10/08/2023 - 17:00:43 PM
   *
   * @param {DataDon} data
   */

 checkAndApplyDisabled(data: Quette){
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
     * 
     * @param id id de l'element selectionner
     * @param templateER le message de l'intention
  */

// actionDadaBindingStart(){
//   this.modalQuestToParent.emit(this.MyQuest);
//   this.MyQuest
// }


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~paginator~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
  this.newPage= this.questListParent.current_page + pageIndex;

  if(this.listType === "all"){
    this.questTest$ =  this.questService.getQuestLits(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
  }
  else if(this.listType === "basket")
  {
    this.questTest$ = this.questService.getBasketQuest(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
  }
  // else{
  //   this.questTest$ = this.questService.getBasketMassWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
  // }
  
  this.questTest$.subscribe((data) => {
    this.questList = data.quettes;
    this.questResult = data.quettes
    this.questListParent =  data;
    this.checkAndApplyDisabled(data);
  });
}

 setSelectedRequest(messe_id: number, days: string, total_Quest:string) {
  this.messe_id = messe_id;
  this.days = days;
  this.total_Quest = total_Quest;
}
selectedQuest(MyQuest:QuestOriginalChild, days:string){
  this.MyQuest = MyQuest.Quest;
  this.days = days;
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
show:boolean = false;
ShowSheckData(){
  this.show = true;
  this.formQuestColumn ={
    amountQuest: true,
      quest_types: true,
      masses_id: true,
      days: true,
      name_days: true,
      heure: true,
      number:true,
      total_Quest:true
  }
}

resetFilter(){
  this.searchBarValue = '';
  this.dateStartValue = environment.dateStartForSearch;
  this.dateEndValue = environment.todayDate;
  this.search();
  this.sendDataToParent();//send data to report for update accumulations
}
 /**
    * Show all data matching filter criteria without pagination for exportation
    * @date 27/10/2023 - 12:42:01 PM
    * 
    */
 export(){
  // show export btn
  this.showBtnExport = true;
  //clear table
  this.questList = [];
  this.questListParent = {
    status: '',
    status_code: 0,
    status_message: '',
    current_page: -1,
    last_page: 0,
    total_quette: 0,
    cumul_montant: 0,
    quettes: []
  }
    
    this.questTest$ = this.questService.getQuestLits();
    this.pdfOrientation = 'landscape';
    this.pdfTitle = 'Liste de toutes les quêts';
    this.pdfFileName = 'Liste_complète_des_quêtes.pdf';
    this.excelFileName = 'Liste_complète_des_quêtes.xlsx';

  this.questTest$.subscribe((data) => {
    this.questList = data.quettes;
    this.questListParent =  data;
    this.isExporting = true;

  });

}

MasquerList(){
  this.showBtnExport = false;
  this.questTest$ = this.questService.getQuestLits();
  this.questTest$.subscribe((data)=>{
    this.questList = data.quettes;
    this.questListParent=data;
  })
}
 /**
   * Get data matching filter criteria
   * @date 27/10/2023 - 10:32 PM
   */
 search(){
  // this.hideExportationButton();
  this.sendDataToParent();
  this.isRefreshing = true;
  if (this.listType === "all") {//all list quest
    this.searchTerms.next(this.searchBarValue);
    this.quest$ = this.searchTerms.pipe(
      debounceTime(300),
      switchMap((term) => this.questService.getQuestLits('1',term, this.dateStartValue, this.dateEndValue))
    );
  }
  else if(this.listType === "basket") //basket
  {
    this.searchTerms.next(this.searchBarValue);
      this.quest$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.questService.getBasketQuest('1',term, this.dateStartValue, this.dateEndValue))
      );
  }
  // else if(this.listType === "all")
  // { 
  //   this.searchTerms.next(this.searchBarValue);
  //   this.messe$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term) => this.massRequestService.getAllMassGeneral('1',term, this.dateStartValue, this.dateEndValue))
  //   );
  // }
  // else{//failed
  //   this.searchTerms.next(this.searchBarValue);
  //   this.messe$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((term) => this.massRequestService.getBasketMassWhere('1',term, this.dateStartValue, this.dateEndValue))
  //   );
  // }

  //Getting data from API depending filter criteria
  this.quest$.subscribe((data) => {
    this.questList = data.quettes;
    this.questListParent = data;
    this.checkAndApplyDisabled(data);
    this.isRefreshing = false;
  });
}


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
