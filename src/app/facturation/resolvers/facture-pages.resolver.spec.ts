import { TestBed } from '@angular/core/testing';

import { FacturePagesResolver } from './facture-pages.resolver';

describe('FacturePagesResolver', () => {
  let resolver: FacturePagesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FacturePagesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
