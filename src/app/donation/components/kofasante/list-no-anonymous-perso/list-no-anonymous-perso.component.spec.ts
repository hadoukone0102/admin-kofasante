import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNoAnonymousPersoComponent } from './list-no-anonymous-perso.component';

describe('ListNoAnonymousPersoComponent', () => {
  let component: ListNoAnonymousPersoComponent;
  let fixture: ComponentFixture<ListNoAnonymousPersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListNoAnonymousPersoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListNoAnonymousPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
