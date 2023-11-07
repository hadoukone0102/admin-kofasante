import { Component } from '@angular/core';
import { discount } from '../../models/mass.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.css']
})
export class DiscountListComponent {
  discount$!:Observable<discount>;
  massDiscount!: discount;
  massActive!: string;

  constructor(
    private route: ActivatedRoute,
    ){}

  ngOnInit(): void {
   
    this.discount$ = this.route.data.pipe(
      map(data =>data['discountListResolver']),
    );
    
  }

}
