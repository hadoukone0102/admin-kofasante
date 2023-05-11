import { TestBed } from '@angular/core/testing';

import { PresidentParishCouncilGuard } from './president-parish-council.guard';

describe('PresidentParishCouncilGuard', () => {
  let guard: PresidentParishCouncilGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PresidentParishCouncilGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
