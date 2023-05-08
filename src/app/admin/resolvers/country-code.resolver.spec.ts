import { TestBed } from '@angular/core/testing';

import { CountryCodeResolver } from './country-code.resolver';

describe('CountryCodeResolver', () => {
  let resolver: CountryCodeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(CountryCodeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
