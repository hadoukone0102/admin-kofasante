import { TestBed } from '@angular/core/testing';

import { ListeTypeMedResolver } from './liste-type-med.resolver';

describe('ListeTypeMedResolver', () => {
  let resolver: ListeTypeMedResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListeTypeMedResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
