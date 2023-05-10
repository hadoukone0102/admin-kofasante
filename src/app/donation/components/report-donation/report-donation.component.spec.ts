import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDonationComponent } from './report-donation.component';

describe('ReportDonationComponent', () => {
  let component: ReportDonationComponent;
  let fixture: ComponentFixture<ReportDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
