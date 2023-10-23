import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';
import { ChildMassRequest, MassRequest, Masses } from '../../models/mass-request.model';
import { MassRequestService } from '../../services/mass-request.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterMassData } from '../../models/filter-model.model';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
import { MassService} from '../../services/mass.service'
import autoTable from 'jspdf-autotable';
import { ActivatedRoute } from '@angular/router';
import { FormDonationColumn } from 'src/app/donation/models/form-donation-column.model';
import { linePaginateAnimation, zoomEnterAnimation } from 'src/app/core/animations/animations';
@Component({
  selector: 'app-mass-request-table',
  templateUrl: './mass-request-table.component.html',
  animations:[
    linePaginateAnimation,
    zoomEnterAnimation
  ]
})
export class MassRequestTableComponent {
  // ~~~~~~~~~~~~~~~Model mass request~~~~~~~~~~~~~~~~~~
  @Input() massRequests!:MassRequest;
  @Input() Masses!:ChildMassRequest;
 
  childMassRequests: ChildMassRequest[]=[];
  type!:string; 
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
// ~~~~~~~~~~~ Print variables ~~~~~~~~~~~ //
styleString: string ='';
pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
pdfTitle: string="Liste des Demandes de Messe";
pdfFileName!: string;
excelFileName: string = "Demande-noAnonyme";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
@Input() messeListParent!: MassRequest;
@Input() listType!: string; 
@Input() showBouton!:boolean;
// ~~~~~~~~~~~~~~~~~~~boolean value ~~~~~~~~~~~~~~~~~~~~
afficher!:boolean;
isAnonymous!: boolean;
isExporting!: boolean;
showBtnExport:boolean = false;
// ~~~~~~~~~~~ Refresh variable ~~~~~~~~~~ //
isRefreshing!: boolean;

  // ~~~~~~~~~~ Donation variables ~~~~~~~~~ //
  messe$!: Observable<MassRequest>;
  messeTest$!: Observable<MassRequest>;
  messeListTest!: Array<ChildMassRequest>;
  messeList!: Array<ChildMassRequest>;
  formDonationColumn!: FormDonationColumn;
  //~~~~~~~~~~~~~~~~~~~~~~~ for modal notification ~~~~~~~~~~~~~~~~ééé
  selectedRequestIntention!: string;
  selectedTemplateER!: string;

  constructor(
    private coreService: CoreService,
    private massRequestService: MassRequestService,
    private route: ActivatedRoute,
    private MassService: MassService,
    ){}


    ngOnInit(){
      this.sendDataToParent();
      this.showAnonymous();
      this.showTableOfType(this.listType);
      this.showBoutonOption(this.showBouton); 

      // this.route.data.pipe(map(data=>data['massNoAnonymousRequestResolver']))
      //   .subscribe((data)=>{
      //     this.massRequests = data;  
      //     console.log(this.massRequests.demande_messe);
      //   }
      //   );

        this.messeList = this.messeListParent.demande_messe;
        
      this.massRequestService.getMass().subscribe(
        (data)=>{
          this.Masses = data;
          }
      )
      this.checkAndApplyDisabled(this.massRequests);
    }
    /**
     * 
     * @param id id de l'element selectionner
     * @param templateER le message de l'intention
     */
    setSelectedRequest(intention: string, templateER: string) {
      this.selectedRequestIntention = intention;
      this.selectedTemplateER = templateER;
    }
    

     /**
   * Show table matching donation type
   * @date 5/17/2023 - 12:50:42 PM
   *
   * @param {string} type
   */
  showBoutonOption(valeur:boolean){
    if(valeur === true){
      this.afficher = true
    }else if(valeur === false){
      this.afficher = false;
    }
  }
  showTableOfType(type: string){
    if(type === "anonymous"){
      this.showAnonymous();
    }
    else if(type === "noAnonymousPerso"){
      this.showNoAnonymous();
    }
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
    this.newPage= this.messeListParent.current_page + pageIndex;

    if(this.listType === "anonymous"){
      this.messeTest$ =  this.massRequestService.getMassAnonymousWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else if(this.listType === "noAnonymous")
    {
      this.messeTest$ =  this.massRequestService.getMassNoAnonymousWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else if(this.listType === "all")
    {
      this.messeTest$ = this.massRequestService.getAllMassGeneral(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    else{//failed (Corbeille)
      this.messeTest$ = this.massRequestService.getBasketMassWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    
    this.messeTest$.subscribe((data) => {
      this.messeList = data.demande_messe;
      this.messeListParent =  data;
      this.checkAndApplyDisabled(data);
    });
  }






  goToAnonymousMassRequest(){
    this.coreService.goToAnonymousMassRequest();
  }

  goToNoAnonymousMassRequest(){
    this.coreService.goToNoAnonymousMassRequest();
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

   /**
   * Hide  exportation button
   * @date 19/10/2023 - 10:32 PM
   */
   hideExportationButton(){
    this.isExporting =false;
  }

  /**
   * Get data matching filter criteria
   * @date 19/10/2023 - 10:32 PM
   */
  search(){
    this.hideExportationButton();
    this.sendDataToParent();
    this.isRefreshing = true;
    if (this.listType === "anonymous") {//Anonymous
      this.searchTerms.next(this.searchBarValue);
  
      this.messe$ = this.searchTerms.pipe(
        debounceTime(300),
        switchMap((term) => this.massRequestService.getMassAnonymousWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }
    else if(this.listType === "noAnonymous") //non-anonymous 
    {
      this.searchTerms.next(this.searchBarValue);
        this.messe$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => this.massRequestService.getMassNoAnonymousWhere('1',term, this.dateStartValue, this.dateEndValue))
        );
    }
    else if(this.listType === "all")
    { 
      this.searchTerms.next(this.searchBarValue);
      this.messe$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.massRequestService.getAllMassGeneral('1',term, this.dateStartValue, this.dateEndValue))
      );
    }
    else{//failed
      this.searchTerms.next(this.searchBarValue);
      this.messe$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.massRequestService.getBasketMassWhere('1',term, this.dateStartValue, this.dateEndValue))
      );
    }

    //Getting data from API depending filter criteria
    this.messe$.subscribe((data) => {
      this.messeList = data.demande_messe;
      this.messeListParent = data;
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

/**
 * for btn export
 */
Export:boolean= false;
IsHidden:boolean = true;
ActionExport(){
  // this.Export = true;
  // this.IsHidden = false;
  this.type= "all";
}

 /**
    * Show all data matching filter criteria without pagination for exportation
    * @date 5/17/2023 - 12:42:01 PM
    */
 export(){
  // show export btn
  this.showBtnExport = true;
  //clear table
  this.messeList = [];
  this.messeListParent = {
    message: '',
    succes: 0,
    status_code: 0,
    current_page: 0,
    last_page: -1,
    total_massesRe: 0,
    total_massesRe_page: 0,
    cumul_montant_page: 0,
    cumul_montants: 0,
    demande_messe:[],
  }
  
  if(this.listType === "anonymous"){
    this.messeTest$ =   this.massRequestService.getMassAnonymousWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    this.pdfOrientation = 'portrait';
    this.pdfTitle = 'Liste des messe anonyme';
    this.pdfFileName = 'liste_des_messes_anonyme.pdf';
    this.excelFileName = 'liste_des_messes_anonyme.xlsx';
  }
  else if(this.listType === "noAnonymousPerso")
  {
    this.messeTest$ =   this.massRequestService.getMassNoAnonymousWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    this.pdfOrientation = 'landscape';
    this.pdfTitle = 'Liste des messes non anonyme faits à titre personnel';
    this.pdfFileName = 'messes_non_anonyme_personnel.pdf';
    this.excelFileName = 'messes_non_anonyme_personnel.xlsx';
  }
  else //all
  {
    this.messeTest$ = this.massRequestService.getAllMassGeneral();
    this.pdfOrientation = 'landscape';
    this.pdfTitle = 'Liste de toutes les Messes';
    this.pdfFileName = 'Liste_complète_des_messes.pdf';
    this.excelFileName = 'Liste_complète_des_messes.xlsx';
  }

  this.messeTest$.subscribe((data) => {
    this.messeList = data.demande_messe;
    this.messeListParent =  data;
    console.log(this.messeList);
    console.log(this.messeListParent);
    this.checkAndApplyDisabled(data);
    this.isExporting = true;

  });
}

MasquerList(){
  this.showBtnExport = false;
  this.messeTest$ = this.massRequestService.getAllMass();
  this.messeTest$.subscribe((data)=>{
    this.messeList = data.demande_messe;
    this.messeListParent=data;
  })
}


handleDataColumnFromChild(dataColumn: FormDonationColumn) {
  this.formDonationColumn = dataColumn;
  console.log(this.formDonationColumn);
}
 
  /**
   * Allows to display only columns for the list of anonymous donatitons
   * @date 5/17/2023 - 12:55:09 PM
   * 
   */
showAnonymous(){
  this.isAnonymous = true;
  //Initialisation
  this.formDonationColumn = {
    number: true,
    montantDon: true,
    typeDon: true,
    organisationDon: true,
    civiliteDon: true,
    nomDon: true,
    prenomDon: true,
    contactDon: true,
    payeurDon: true,
    paysDon: false,
    villeDon: true,
    transactionId: true,
    dateDon: true,
    intention: true,
    templateER:false,
  }
}
showNoAnonymous(){
  this.isAnonymous = false;
  //Initialisation
  this.formDonationColumn = {
    number: true,
    montantDon: true,
    typeDon: true,
    organisationDon: true,
    civiliteDon: true,
    nomDon: true,
    prenomDon: true,
    contactDon: true,
    payeurDon: true,
    paysDon: false,
    villeDon: true,
    transactionId: true,
    dateDon: true,
    intention: true,
    templateER:false,
  }
}













}

