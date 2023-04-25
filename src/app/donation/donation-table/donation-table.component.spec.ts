import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationTableComponent } from './donation-table.component';

describe('DonationTableComponent', () => {
  let component: DonationTableComponent;
  let fixture: ComponentFixture<DonationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
