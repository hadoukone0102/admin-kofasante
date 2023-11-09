import { TestBed } from '@angular/core/testing';

import { ReportQuestResolver } from './report-quest.resolver';

describe('ReportQuestResolver', () => {
  let resolver: ReportQuestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ReportQuestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
