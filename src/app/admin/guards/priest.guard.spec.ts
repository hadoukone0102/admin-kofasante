import { TestBed } from '@angular/core/testing';

import { PriestGuard } from './priest.guard';

describe('PriestGuard', () => {
  let guard: PriestGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PriestGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
