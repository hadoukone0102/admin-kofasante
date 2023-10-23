import { TestBed } from '@angular/core/testing';

import { MassReportServicesService } from './mass-report-services.service';

describe('MassReportServicesService', () => {
  let service: MassReportServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassReportServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
