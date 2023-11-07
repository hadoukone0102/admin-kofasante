import { TestBed } from '@angular/core/testing';

import { MassNeuvResolver } from './mass-neuv.resolver';

describe('MassNeuvResolver', () => {
  let resolver: MassNeuvResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassNeuvResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
