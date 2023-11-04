import { TestBed } from '@angular/core/testing';

import { BasketQuestResolver } from './basket-quest.resolver';

describe('BasketQuestResolver', () => {
  let resolver: BasketQuestResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BasketQuestResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
