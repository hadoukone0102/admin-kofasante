import { TestBed } from '@angular/core/testing';

import { MassReportResolver } from './mass-report.resolver';

describe('MassReportResolver', () => {
  let resolver: MassReportResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MassReportResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
