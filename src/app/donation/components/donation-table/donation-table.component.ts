import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, takeWhile } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { CoreService } from 'src/app/core/services/core.service';
import { HttpClient } from '@angular/common/http';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html',
  // styleUrls: ['./donation-table.component.css']
})
export class DonationTableComponent implements OnInit{
  
  //New
  @Input() donationListParent!: DataDon;
  @Input() listType!: string; //ano ? perso ? orga ? all 
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = "";
  dateEndValue: string = "";

  @Output() searchBarValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateStartValueToParent: EventEmitter<string> = new EventEmitter<string>();
  @Output() dateEndValueToParent: EventEmitter<string> = new EventEmitter<string>();


  donations$!: Observable<DataDon>;
  donationTest$!: Observable<DataDon>;
  donationListTest!: Array<Don>;
  allDonations!: Array<Don>;

  isAnonymous!: boolean;
  isOrganisation!: boolean;
  isAll!: boolean;
  noData!: boolean;

  donationList!: Array<Don>;

  isFirstPage!: string;
  isLastPage!: string;
  newPage!: number;

  todayDate!: string;

  //print
  styleString: string ='';
  isExporting!: boolean;
  pdfOrientation: "landscape" | "p" | "portrait" | "l" | undefined;
  pdfTitle!: string;
  pdfFileName!: string;
  excelFileName!: string;


  constructor(
    private router: Router,
    private donationService: DonationService,
    private coreService :  CoreService,
    private route: ActivatedRoute,
    private http: HttpClient
    ) {}

    

  ngOnInit(): void {
    this.showTableOfType(this.listType);
    this.donationList = this.donationListParent.dons;
    this.checkAndApplyDisabled(this.donationListParent);

    const now = new Date();
    this.todayDate = now.toISOString().substring(0, 10); // format AAAA-MM-JJ
    this.dateEndValue = this.todayDate;
    this.dateStartValue = this.todayDate;
    this.sendDataToParent();
    this.search(); //to make work the first (change) after loading page
    //Send data for search to parent
    
    this.isExporting = false;
    this.pdfOrientation ='p';
    this.pdfTitle ='';
    this.pdfFileName = '';
    this.excelFileName = '';
    
  }
  
  hideExportationButton(){
    this.isExporting =false;
  }

  exportToPDF(){
    let doc =  new jsPDF(/*'p','mm','a3'*/{orientation: this.pdfOrientation,});
    let titleSize = 20;

    let textWidth = doc.getStringUnitWidth(this.pdfTitle) * titleSize / doc.internal.scaleFactor;
    let margin = (doc.internal.pageSize.width - textWidth) / 2;

    doc.setFontSize(titleSize);
    doc.setFont('Roboto','bold');
    doc.text(this.pdfTitle, margin, 20);
    autoTable(doc, {html: "#exportTable", theme: "grid", startY: 30,});
    doc.save(this.pdfFileName);
  }

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
  exportToCSV(){

  }

   /**
   * IMPRESSION
   * @date 5/11/2023 - 8:43:06 PM
   */
   export(){
    if(this.listType === "anonymous"){
      this.donationTest$ =  this.donationService.getAllDonationsAnonymousWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
      this.pdfOrientation = 'portrait';
      this.pdfTitle = 'Liste des dons anonyme';
      this.pdfFileName = 'liste_des_dons_anonyme.pdf';
      this.excelFileName = 'liste_des_dons_anonyme.xlsx';
      console.log('coolmano: ',this.pdfOrientation);
      
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
      // this.donationTest$ = this.donationService.getAllDonationsWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    }

    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
      this.isExporting = true;

    });
  }

  
  showConsole(){
    console.log("ma date de début bro: "+this.dateStartValue);
  }

  sendDataToParent(){
    console.log("dans le sednd data to parendt= "+ this.dateStartValue);
    
    this.searchBarValueToParent.emit(this.searchBarValue);
    this.dateStartValueToParent.emit(this.dateStartValue);
    this.dateEndValueToParent.emit(this.dateEndValue);
  }

  search(){
    this.hideExportationButton();
    this.sendDataToParent();
    if (this.isAnonymous && !this.isAll) {
      console.log("anonm");
      this.searchTerms.next(this.searchBarValue);
  
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        switchMap((term) => this.donationService.searchDonationListAno(term, this.dateStartValue, this.dateEndValue))
      );
    
      this.donations$.subscribe((donations) => {
        this.donationList = donations.dons;
        this.donationListParent = donations;
        this.checkAndApplyDisabled(donations)
      });
    }
    else if(!this.isAnonymous && !this.isOrganisation && !this.isAll)
    {
      this.searchTerms.next(this.searchBarValue);
        console.log("non anonme personally");
        this.donations$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => this.donationService.searchDonationListNoAnoPerso(term, this.dateStartValue, this.dateEndValue))
        );
      
        this.donations$.subscribe((donations) => {
          this.donationList = donations.dons;
          this.donationListParent = donations;
          this.checkAndApplyDisabled(donations);
      });
    }
    else if(!this.isAnonymous && this.isOrganisation && !this.isAll)
    {
      console.log("orga");
      this.searchTerms.next(this.searchBarValue);
    
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.searchDonationListNoAnoOrga(term, this.dateStartValue, this.dateEndValue))
      );
      
      this.donations$.subscribe((donations) => {
        this.donationList = donations.dons;
        this.donationListParent = donations;
        this.checkAndApplyDisabled(donations);
      });
    }
    else //all
    { 
      this.searchTerms.next(this.searchBarValue);
    
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.searchDonation(term, this.dateStartValue, this.dateEndValue))
      );
    
      this.donations$.subscribe((donations) => {
        this.donationList = donations.dons;
        this.donationListParent = donations;
        this.checkAndApplyDisabled(donations);
      });
    }
  }

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
  
  goToPrevious(){
    // t:his.showPage(-1);
    if(this.searchBarValue === "" && this.dateStartValue === ""){
      console.log("the first");
      
      this.showPage(-1);
      
    }
    else{
      console.log("the last: "+this.searchBarValue);

      this.showPageWhere(-1);
    }
  }
  
  goToNext(){
    // this.showPage(1);
    if(this.searchBarValue === "" && this.dateStartValue === ""){
      console.log("the first");
      
      this.showPage(1);
      
    }
    else{
      console.log("the last: "+this.searchBarValue);

      this.showPageWhere(1);
    }
  }
  
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
    else //all
    {
      this.donationTest$ = this.donationService.getDonationsWhere(this.newPage.toString(), this.searchBarValue, this.dateStartValue, this.dateEndValue)
    }
    
    this.donationTest$.pipe(
      takeWhile(data => !data, true)
    )
    .subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
      console.log("my last page: "+data.last_page);
      
    });
    // this.donationTest$.subscribe((data) => {
      //   this.donationList = data.dons;
      //   this.donationListParent =  data;
    //   this.checkAndApplyDisabled(data);
    //   console.log("my last page: "+data.last_page);
      
    // });
  }

  showPage(pageIndex: number){
    this.newPage= this.donationListParent.current_page + pageIndex;
    console.log("je suis: "+ this.newPage);
    
    if(this.listType == "anonymous"){
      this.donationTest$ =  this.donationService.getDonationsAnonymous(this.newPage.toString())
    }
    else if(this.listType == "noAnonymousPerso")
    {
      this.donationTest$ =  this.donationService.getDonationsNoAnonymousPerso(this.newPage.toString())
    }
    else if(this.listType == "noAnonymousOrga")
    {
      this.donationTest$ =  this.donationService.getDonationsNoAnonymousOrga(this.newPage.toString())
    }
    else{// type = all
      this.donationTest$ =  this.donationService.getDonations(this.newPage.toString())
    }
    
    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
    });
  }

  showAnonymous(){
    this.isAnonymous = true;
  }

  showNoAnonymousPerso(){
    this.isAnonymous = false;
    this.isOrganisation = false;
  }

  showNoAnonymousOrga(){
    this.isAnonymous = false;
    this.isOrganisation = true;
  }

  showAll(){
    this.isAnonymous = false;
    this.isOrganisation = true;
    this.isAll = true;
  }

  checkAndApplyDisabled(donationListParenta: DataDon){
    if((donationListParenta.current_page === 1) && (donationListParenta.current_page != donationListParenta.last_page)){
      console.log("1/...");
      
      this.isFirstPage = "disabled";
      this.isLastPage = "";
    }else{
      if((donationListParenta.current_page === 1) && (donationListParenta.current_page === donationListParenta.last_page)){
        console.log("1/1");
        this.isFirstPage = "disabled";
        this.isLastPage = "disabled";
      }
      else{
        if((donationListParenta.current_page != 1) && (donationListParenta.current_page != donationListParenta.last_page)){
          console.log(".../...");
          this.isFirstPage  = "";
          this.isLastPage = "";
        }
        else{
            console.log(".../1");
            this.isFirstPage  = "";
            this.isLastPage = "disabled";
        }
      }
    }
  }

  
 

}
