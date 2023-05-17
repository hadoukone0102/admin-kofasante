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

  /**
   * Get disabled accounts when the page is initialized
   * @date 5/17/2023 - 2:39:43 PM
   */
  ngOnInit(): void {
    this.disabledAccounts$ = this.route.data.pipe(
      map(data => data['listDisabledAccount'])
    );

    this.disabledAccounts$.subscribe(
      data => {
        this.disabledAccounts = data;
      }
    );
      
  }
}
