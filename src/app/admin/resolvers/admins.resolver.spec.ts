import { TestBed } from '@angular/core/testing';
import { ListAdminsResolver } from './list-admins.resolver';


describe('ListAdminsResolver', () => {
  let resolver: ListAdminsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ListAdminsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
