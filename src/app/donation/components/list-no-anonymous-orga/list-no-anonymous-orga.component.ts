import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-list-no-anonymous-orga',
  templateUrl: './list-no-anonymous-orga.component.html'
})
export class ListNoAnonymousOrgaComponent {
  donations$!: Observable<DataDon>;

  constructor(
    private route: ActivatedRoute,
    ) { }

  /**
   * Get the list of non-anonymous donations made by organizations
   * when the page is initialized
   * @date 5/17/2023 - 1:58:58 PM
   */
  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listNoAnonymousOrga'])
    );
  }
}
