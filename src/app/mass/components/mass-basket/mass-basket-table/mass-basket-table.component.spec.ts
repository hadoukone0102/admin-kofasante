import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassBasketTableComponent } from './mass-basket-table.component';

describe('MassBasketTableComponent', () => {
  let component: MassBasketTableComponent;
  let fixture: ComponentFixture<MassBasketTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassBasketTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassBasketTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
