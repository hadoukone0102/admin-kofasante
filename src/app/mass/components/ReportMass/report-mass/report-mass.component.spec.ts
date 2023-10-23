import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMassComponent } from './report-mass.component';

describe('ReportMassComponent', () => {
  let component: ReportMassComponent;
  let fixture: ComponentFixture<ReportMassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
