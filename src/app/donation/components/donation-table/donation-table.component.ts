import { Component, ElementRef, Input } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs';
import { DataDon, Don } from '../../models/don.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DonationService } from '../../services/donation.service';
import { CoreService } from 'src/app/core/core.service';
import { AdminService } from 'src/app/admin/services/admin.service';

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
  

  donations$!: Observable<Don[]>;
  donationTest$!: Observable<DataDon>;
  donationListTest!: Array<Don>;

  isAnonymous!: boolean;
  isOrganisation!: boolean;

  donationList!: Array<Don>;

  isFirstPage!: boolean;
  isLastPage!: boolean;
  newPage!: number;

  constructor(
    private router: Router,
    private donationService: DonationService,
    private coreService :  CoreService,
    private route: ActivatedRoute,
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
    
    this.donationList = this.donationListParent.dons;
    console.log("donation table ok");
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

  
  
  goToPrevious(){
    this.checkAndApplyDisabled();
    // this.router.navigate(['/dons/anonyme', page = +this.donationListParent.current_page - 1]);
  }
  
  goToNext(){
    // this.checkAndApplyDisabled();
    
    this.newPage= +this.donationListParent.current_page +1;
    console.log("je suis: "+ this.newPage);
    this.donationService.setPageDonationAnonymous(this.newPage.toString());
    this.donationTest$ =  this.donationService.getDonationsAnonymous()
    
    // this.router.navigate(['/dons/anonyme']);

    // this.donationList = this.donationListParent.dons;
    console.log("The received list");
    
    // console.table(this.donationList);

    this.donationTest$.subscribe((data) => {
      this.donationList = data.dons;
      this.donationListParent =  data;
  });
    
    if(this.donationListTest){
      console.table(this.donationListTest);
    }
    else{
      console.log('nada dabord');
    }
    

    // this.donations$ = this.route.data.pipe(
    //   map(data => data['listAnonymous'])
    // );
    // this.coreService.goToDonationAnonymous();
  }

  refreshData(): void {
    this.router.navigate(['/dons/anonyme'], { relativeTo: this.route });
  }

  rechargeResolver() {
    if (this.router.navigated) {
      // Naviguer vers la même URL avec un objet de navigation vide pour recharger le résolveur
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
        queryParamsHandling: 'merge'
      });
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

  checkAndApplyDisabled(){
    if(this.donationListParent.current_page === '1'){
      this.isFirstPage = true;
      this.isLastPage = false;
    }else{
      if(+this.donationListParent.current_page === this.donationListParent.last_page){
        this.isFirstPage = false;
        this.isLastPage = true;
      }
      else{
        this.isFirstPage  = false;
        this.isLastPage = false;
      }
    }
  }
}
