import { TestBed } from '@angular/core/testing';

import { KofaPaiementResolver } from './kofa-paiement.resolver';

describe('KofaPaiementResolver', () => {
  let resolver: KofaPaiementResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(KofaPaiementResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
