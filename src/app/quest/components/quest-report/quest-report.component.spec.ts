import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestReportComponent } from './quest-report.component';

describe('QuestReportComponent', () => {
  let component: QuestReportComponent;
  let fixture: ComponentFixture<QuestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
