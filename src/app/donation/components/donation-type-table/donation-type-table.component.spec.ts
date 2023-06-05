import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTypeTableComponent } from './donation-type-table.component';

describe('DonationTypeTableComponent', () => {
  let component: DonationTypeTableComponent;
  let fixture: ComponentFixture<DonationTypeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationTypeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
