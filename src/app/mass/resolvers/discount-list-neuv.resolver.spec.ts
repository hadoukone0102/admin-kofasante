import { TestBed } from '@angular/core/testing';

import { DiscountListNeuvResolver } from './discount-list-neuv.resolver';

describe('DiscountListNeuvResolver', () => {
  let resolver: DiscountListNeuvResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DiscountListNeuvResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
