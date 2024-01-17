import { TestBed } from '@angular/core/testing';

import { MedecinePageResolver } from './medecine-page.resolver';

describe('MedecinePageResolver', () => {
  let resolver: MedecinePageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MedecinePageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
