import { TestBed } from '@angular/core/testing';

import { RenseignerPageResolver } from './renseigner-page.resolver';

describe('RenseignerPageResolver', () => {
  let resolver: RenseignerPageResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RenseignerPageResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
