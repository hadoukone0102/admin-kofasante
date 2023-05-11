import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap, takeWhile } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html'
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

  constructor(
    private router: Router,
    private donationService: DonationService,
    private coreService :  CoreService,
    private route: ActivatedRoute,
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
    this.allDonations;
    
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

  
  /**
   * IMPRESSION
   * @date 5/11/2023 - 8:43:06 PM
   */
  exportToPDF(){
    if(this.listType === "anonymous"){
      this.donationTest$ =  this.donationService.getAllDonationsAnonymousWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);

    }
    else if(this.listType === "noAnonymousPerso")
    {
      this.donationTest$ =  this.donationService.getAllDonationsNoAnonymousPersoWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    }
    else if(this.listType === "noAnonymousOrga")
    {
      this.donationTest$ =  this.donationService.getAllDonationsNoAnonymousOrgaWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    }
    else //all
    {
      // this.donationTest$ = this.donationService.getAllDonationsWhere(this.searchBarValue, this.dateStartValue, this.dateEndValue);
    }
    
    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.allDonations = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
      console.log("my last page: "+data.last_page);
      console.table(this.allDonations);

      //IMPRESSION


      // 3. Générer le contenu de la vue imprimable
    let printableContent = '';
    this.allDonations.forEach((donation, index) => {
      console.log("dans le all bro");
      
      printableContent += `
        <tr>
          <td>${index + 1}</td>
          <td>${donation.montantDon}</td>
          <td>${donation.typeDon}</td>
          <td>${donation.updated_at } </td>
          <!-- Ajoutez les autres colonnes de données nécessaires -->
        </tr>
      `;
    });

    // 4. Ouvrir une nouvelle fenêtre d'impression
    const printWindow = window.open('', '_blank');
    printWindow!.document.write(`
      <html>
        <head>
          <title>http://stjosephmukassa.ci/</title>
          <style>
            /* Styles CSS pour la vue imprimable */
            /* Styles spécifiques pour l'impression */

  body {
    font-family: Arial, sans-serif;
  }

  .page {
    page-break-after: always;
    padding: 20px;
  }

  h1 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border:1px solid #0a0a0a;
  }
  tr {
    width: 100%;
    border:1px solid #0a0a0a;
  }

  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
  }
            @media print {
              /* Masquer les éléments non requis */
              button {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <h1>Liste complète des dons anonymes</h1>
          <table>
            <thead>
            <tr>
                  <th class="border-0 rounded-start">N°</th>
                  <th class="border-0">Montant</th>
                  <th class="border-0">Type</th>
                  <th class="border-0">Date</th>
           </tr>
            <tbody>
              ${printableContent}
            </tbody>
          </table>
        </body>
        <footer><h4>saint joseph mukassa</h4></footer>
      </html>
    `);

    printWindow!.document.close();
    printWindow!.print();

      
    });

    
    
  }
}
