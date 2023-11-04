import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestListsComponent } from './quest-lists.component';

describe('QuestListsComponent', () => {
  let component: QuestListsComponent;
  let fixture: ComponentFixture<QuestListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestListsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
