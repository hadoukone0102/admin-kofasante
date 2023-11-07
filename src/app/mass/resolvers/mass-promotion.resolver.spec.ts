import { TestBed } from '@angular/core/testing';

import { MassPromotionResolver } from './mass-promotion.resolver';

describe('MassPromotionResolver', () => {
  let resolver: MassPromotionResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassPromotionResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
