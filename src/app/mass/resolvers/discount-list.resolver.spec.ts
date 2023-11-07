import { TestBed } from '@angular/core/testing';

import { DiscountListResolver } from './discount-list.resolver';

describe('DiscountListResolver', () => {
  let resolver: DiscountListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiscountListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
