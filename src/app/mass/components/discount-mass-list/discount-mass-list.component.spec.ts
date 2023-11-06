import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountMassListComponent } from './discount-mass-list.component';

describe('DiscountMassListComponent', () => {
  let component: DiscountMassListComponent;
  let fixture: ComponentFixture<DiscountMassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountMassListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountMassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
