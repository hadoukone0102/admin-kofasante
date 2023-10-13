import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMassReportComponent } from './all-mass-report.component';

describe('AllMassReportComponent', () => {
  let component: AllMassReportComponent;
  let fixture: ComponentFixture<AllMassReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMassReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMassReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
