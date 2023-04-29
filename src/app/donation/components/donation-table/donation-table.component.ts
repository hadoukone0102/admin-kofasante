import { Component, ElementRef, Input } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { DonationService } from '../../services/donation.service';

@Component({
  selector: 'app-donation-table',
  templateUrl: './donation-table.component.html'
})
export class DonationTableComponent {
  @Input() donations!: DataDon;
  @Input() donationNoAnoPerso!: DataDon;
  @Input() donationNoAnoOrga!: DataDon;
  searchTerms =  new Subject<String>();
  searchBarValue!: string;

  monDon: DataDon = new DataDon();
  donations$!: Observable<Don[]>;

  isAnonymous!: boolean;
  isOrganisation!: boolean;
  title!: string;
  activeAnonymous!: string;
  activeNoAnonymous!: string;
  donationList!: Array<Don>;

  constructor(
    private element: ElementRef, 
    private route: ActivatedRoute,
    private donationService: DonationService
    ) {}

  ngOnInit(): void {
    this.isAnonymous = false;
    this.title = "Dons non anonyme";
    this.activeAnonymous= "";
    this.activeNoAnonymous= "btn-primary";
    this.isOrganisation = false;
    // this.togglePersonal(this.isOrganisation);
    console.table(this.donations.dons);
    
    console.log("Boommmmdata fin");
    this.donationList = this.donationNoAnoPerso.dons;
    console.table(this.donationList);
    console.log("NO ANO ORA DANS INIT");
    console.table(this.donationNoAnoOrga.dons);
  }

  

  search(term: String){
    if (this.isAnonymous) {
      this.searchTerms.next(term);
  
      this.donations$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term) => this.donationService.searchDonationListAno(term))
      );
    
      this.donations$.subscribe((donations) => {
        this.donationList = donations;
      });
    }
    else
    {
      if(!this.isAnonymous && !this.isOrganisation){
        this.searchTerms.next(term);
  
        this.donations$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => this.donationService.searchDonationListNoAnoPerso(term))
        );
      
        this.donations$.subscribe((donations) => {
          this.donationList = donations;
      });
      }
      else{
        this.searchTerms.next(term);
    
        this.donations$ = this.searchTerms.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((term) => this.donationService.searchDonationListNoAnoOrga(term))
        );
      
        this.donations$.subscribe((donations) => {
          this.donationList = donations;
        });
      }
    }
  }

  showAnonymous(){
    this.isAnonymous = true;
    this.title = "Dons anonyme";
    this.activeAnonymous= "btn-primary";
    this.activeNoAnonymous= "";
    this.searchBarValue = "";
    
    this.donationList = this.donations.dons;
    console.log("liste anon !!!");
    console.table(this.donationList);
  }

  showNoAnonymousPerso(){
    this.isAnonymous = false;
    this.title = "Dons non anonyme";
    this.activeAnonymous= "";
    this.activeNoAnonymous= "btn-primary";
    this.isOrganisation = false;
    this.searchBarValue = "";
    
    this.donationList = this.donationNoAnoPerso.dons;
    console.log("liste no anon Perso");
    console.table(this.donationList);
  }

  showNoAnonymousOrga(){
    this.isAnonymous = false;
    this.title = "Dons non anonyme";
    this.activeAnonymous= "";
    this.activeNoAnonymous= "btn-primary";
    this.isOrganisation = false;
    this.searchBarValue = "";
    
    this.donationList = this.donationNoAnoOrga.dons;
    console.log("liste no anon Orga");
    console.table(this.donationList);
  }

  togglePersonal(isOrga: boolean): boolean{
    if(isOrga){
      this.showNoAnonymousOrga();
    }else{
      this.showNoAnonymousPerso();
    }
    return this.isOrganisation = isOrga;

  }

}
