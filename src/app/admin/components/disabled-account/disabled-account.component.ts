import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataDisabledAccount } from '../../models/disabled-account-admin.model';

@Component({
  selector: 'app-disabled-account',
  templateUrl: './disabled-account.component.html',
})
export class DisabledAccountComponent {
  disabledAccounts$!: Observable<DataDisabledAccount>;
  disabledAccounts!: DataDisabledAccount;

  constructor(
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.disabledAccounts$ = this.route.data.pipe(
      map(data => data['listDisabledAccount'])
    );

    this.disabledAccounts$.subscribe(
      data => {
        this.disabledAccounts = data;
        console.log("laroute");
        console.log(this.disabledAccounts);
      }
    );
      
  }
}
