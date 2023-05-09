import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { CoreService } from 'src/app/core/services/core.service';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html'
})
export class DonationTableComponent implements OnInit{
  // @Input() donations!: DataDon;
  // @Input() donationNoAnoPerso!: DataDon;
  // @Input() donationNoAnoOrga!: DataDon;
  //New
  @Input() donationListParent!: DataDon;
  @Input() listType!: string;
  searchTerms =  new Subject<String>();
  searchBarValue: string = "";
  dateStartValue: string = "";
  dateEndValue: string = "";

  

  donations$!: Observable<DataDon>;
  donationTest$!: Observable<DataDon>;
  donationListTest!: Array<Don>;

  isAnonymous!: boolean;
  isOrganisation!: boolean;
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
    this.search(); //to make work (change) after loading page
    
  }

  showConsole(){
    console.log("ma date de début bro: "+this.dateStartValue);
  }

  /**
   * Nouvel algo !!!
   * Récupère toute les données de la table dons
   * Met la liste des don anonyme dans un tableau
   * Met la liste des don non anonyme perso dans un tableau
   * Met la liste des don non anonyme orga dans un tableau
   * Met a jour la donationList en fonction du boutton appuyé
   * Fait la pagination avec ngbBootstrap en fonction de la liste courante bouclé
   * Fait la rechercher en fonction du tableau des dons
   * @param term 
   */
  search(){
    if (this.isAnonymous) {
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
    else
    {
      
      if(!this.isAnonymous && !this.isOrganisation){
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
      else{
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
    }
  }

  showTableOfType(type: string){
    if(type === "anonymous"){
      this.showAnonymous();
    }
    else{
      if(type === "noAnonymousPerso"){
        this.showNoAnonymousPerso();
      }else{ 
        this.showNoAnonymousOrga();
      }
    }
  }
  
  
  goToPrevious(){
    // t:his.showPage(-1);
    if(this.searchBarValue === ""){
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
    if(this.searchBarValue === ""){
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
    console.log("je suis: "+ this.newPage);
    if(this.listType == "anonymous"){
      this.donationTest$ =  this.donationService.getDonationsAnonymousWhere(this.newPage.toString(), this.searchBarValue)
    }else{
      if(this.listType == "noAnonymousPerso"){
        this.donationTest$ =  this.donationService.getDonationsNoAnonymousPersoWhere(this.newPage.toString(), this.searchBarValue)
      }else{ 
        this.donationTest$ =  this.donationService.getDonationsNoAnonymousOrgaWhere(this.newPage.toString(), this.searchBarValue)
      }
    }
    
    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
      this.checkAndApplyDisabled(data);
    });
  }

  showPage(pageIndex: number){
    this.newPage= this.donationListParent.current_page + pageIndex;
    console.log("je suis: "+ this.newPage);
    if(this.listType == "anonymous"){
      this.donationTest$ =  this.donationService.getDonationsAnonymous(this.newPage.toString())
    }else{
      if(this.listType == "noAnonymousPerso"){
        this.donationTest$ =  this.donationService.getDonationsNoAnonymousPerso(this.newPage.toString())
      }else{ 
        this.donationTest$ =  this.donationService.getDonationsNoAnonymousOrga(this.newPage.toString())
      }
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
