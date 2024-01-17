import { TestBed } from '@angular/core/testing';

import { AbonnementPageResolver } from './abonnement-page.resolver';

describe('AbonnementPageResolver', () => {
  let resolver: AbonnementPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AbonnementPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
