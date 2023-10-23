import { TestBed } from '@angular/core/testing';

import { QuestTypeListResolver } from './quest-type-list.resolver';

describe('QuestTypeListResolver', () => {
  let resolver: QuestTypeListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(QuestTypeListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
