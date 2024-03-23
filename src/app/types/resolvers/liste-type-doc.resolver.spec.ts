import { TestBed } from '@angular/core/testing';

import { ListeTypeDocResolver } from './liste-type-doc.resolver';

describe('ListeTypeDocResolver', () => {
  let resolver: ListeTypeDocResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListeTypeDocResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
