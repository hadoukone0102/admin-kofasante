import { TestBed } from '@angular/core/testing';

import { MassRequestResolver } from './mass-request.resolver';

describe('MassRequestResolver', () => {
  let resolver: MassRequestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassRequestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
