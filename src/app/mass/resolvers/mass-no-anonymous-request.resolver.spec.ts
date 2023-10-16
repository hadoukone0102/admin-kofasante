import { TestBed } from '@angular/core/testing';

import { MassNoAnonymousRequestResolver } from './mass-no-anonymous-request.resolver';

describe('MassNoAnonymousRequestResolver', () => {
  let resolver: MassNoAnonymousRequestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassNoAnonymousRequestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
