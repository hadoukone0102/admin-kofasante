import { TestBed } from '@angular/core/testing';

import { ExportMassReqResolver } from './export-mass-req.resolver';

describe('ExportMassReqResolver', () => {
  let resolver: ExportMassReqResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExportMassReqResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
