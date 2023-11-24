import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCatechesisComponent } from './list-catechesis.component';

describe('ListCatechesisComponent', () => {
  let component: ListCatechesisComponent;
  let fixture: ComponentFixture<ListCatechesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCatechesisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCatechesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
