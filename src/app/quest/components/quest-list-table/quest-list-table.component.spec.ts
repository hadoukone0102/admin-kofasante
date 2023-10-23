import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestListTableComponent } from './quest-list-table.component';

describe('QuestListTableComponent', () => {
  let component: QuestListTableComponent;
  let fixture: ComponentFixture<QuestListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
