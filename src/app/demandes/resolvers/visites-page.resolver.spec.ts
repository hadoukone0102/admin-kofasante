import { TestBed } from '@angular/core/testing';

import { VisitesPageResolver } from './visites-page.resolver';

describe('VisitesPageResolver', () => {
  let resolver: VisitesPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(VisitesPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
