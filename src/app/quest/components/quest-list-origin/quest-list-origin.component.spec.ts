import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestListOriginComponent } from './quest-list-origin.component';

describe('QuestListOriginComponent', () => {
  let component: QuestListOriginComponent;
  let fixture: ComponentFixture<QuestListOriginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestListOriginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestListOriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
