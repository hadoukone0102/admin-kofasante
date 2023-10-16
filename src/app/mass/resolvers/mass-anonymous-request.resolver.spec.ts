import { TestBed } from '@angular/core/testing';

import { MassAnonymousRequestResolver } from './mass-anonymous-request.resolver';

describe('MassAnonymousRequestResolver', () => {
  let resolver: MassAnonymousRequestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassAnonymousRequestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
