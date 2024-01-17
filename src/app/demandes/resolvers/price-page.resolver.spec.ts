import { TestBed } from '@angular/core/testing';

import { PricePageResolver } from './price-page.resolver';

describe('PricePageResolver', () => {
  let resolver: PricePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PricePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
