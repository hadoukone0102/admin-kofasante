import { TestBed } from '@angular/core/testing';

import { DiscountListTrenResolver } from './discount-list-tren.resolver';

describe('DiscountListTrenResolver', () => {
  let resolver: DiscountListTrenResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiscountListTrenResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
