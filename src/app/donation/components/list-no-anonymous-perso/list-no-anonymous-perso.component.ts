import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataDon } from '../../models/don.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-list-no-anonymous-perso',
  templateUrl: './list-no-anonymous-perso.component.html'
})
export class ListNoAnonymousPersoComponent {
  donations$!: Observable<DataDon>;

  constructor(
    private route: ActivatedRoute,
    ) { }

  /**
   * Get the list of non-anonymous donations made on a personal basis
   * when the page is initialized
   * @date 5/17/2023 - 1:56:18 PM
   */
  ngOnInit(): void {
    this.donations$ = this.route.data.pipe(
      map(data => data['listNoAnonymousPerso'])
    );
  }
}
