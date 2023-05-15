import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CoreService } from './core/services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router, private coreService: CoreService){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const finalUrl = event.urlAfterRedirects;

        //if containt'nt required prefix go to page not found
        if (
          //Children route of donation
          finalUrl === "/anonyme" ||
          finalUrl === "/non-anonyme/personel" ||
          finalUrl === "/non-anonyme/organisation" ||
          finalUrl === "/bilan-don" ||

          //Children route of admin
          finalUrl === "/liste" ||
          finalUrl === "/ajouter" ||
          finalUrl === "/comptes-inatifs"
        ){
          this.coreService.goToPageNotFound();
        }
      }
    });
  }

}
