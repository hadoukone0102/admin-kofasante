import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoAnonymousOrgaComponent } from './list-no-anonymous-orga.component';

describe('ListNoAnonymousOrgaComponent', () => {
  let component: ListNoAnonymousOrgaComponent;
  let fixture: ComponentFixture<ListNoAnonymousOrgaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoAnonymousOrgaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNoAnonymousOrgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
