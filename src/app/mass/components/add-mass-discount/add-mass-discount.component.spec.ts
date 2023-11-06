import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassDiscountComponent } from './add-mass-discount.component';

describe('AddMassDiscountComponent', () => {
  let component: AddMassDiscountComponent;
  let fixture: ComponentFixture<AddMassDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassDiscountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMassDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
