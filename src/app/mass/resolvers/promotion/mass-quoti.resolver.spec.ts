import { TestBed } from '@angular/core/testing';

import { MassQuotiResolver } from './mass-quoti.resolver';

describe('MassQuotiResolver', () => {
  let resolver: MassQuotiResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassQuotiResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
