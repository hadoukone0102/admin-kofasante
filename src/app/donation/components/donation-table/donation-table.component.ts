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
  // @Input() donations!: DataDon;
  // @Input() donationNoAnoPerso!: DataDon;
  // @Input() donationNoAnoOrga!: DataDon;
  //New
  @Input() donationListParent!: DataDon;
  @Input() listType!: string;
  searchTerms =  new Subject<String>();
  searchBarValue!: string;
  

  monDon: DataDon = new DataDon();
  donations$!: Observable<Don[]>;

  isAnonymous!: boolean;
  isOrganisation!: boolean;
  // title!: string;
  // activeAnonymous!: string;
  // activeNoAnonymous!: string;
  donationList!: Array<Don>;

  constructor(
    private element: ElementRef, 
    private route: ActivatedRoute,
    private donationService: DonationService
    ) {}

  ngOnInit(): void {
    this.showTableOfType(this.listType);
    // this.showAnonymous();
    // this.title = "Dons non anonyme";
    // this.activeAnonymous= "";
    // this.activeNoAnonymous= "btn-primary";
    // this.isOrganisation = false;
    // this.togglePersonal(this.isOrganisation);
    // console.table(this.donations.dons);
    
    console.log("Boommmmdata fin");
    this.donationList = this.donationListParent.dons;
    console.table(this.donationList);
    console.log("NO ANO ORA DANS INIT");
    // console.table(this.donationNoAnoOrga.dons);
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

  // togglePersonal(isOrga: boolean): boolean{
  //   if(isOrga){
  //     this.showNoAnonymousOrga();
  //   }else{
  //     this.showNoAnonymousPerso();
  //   }
  //   return this.isOrganisation = isOrga;

  // }

}
