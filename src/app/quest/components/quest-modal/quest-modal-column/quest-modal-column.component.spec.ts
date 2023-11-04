import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestModalColumnComponent } from './quest-modal-column.component';

describe('QuestModalColumnComponent', () => {
  let component: QuestModalColumnComponent;
  let fixture: ComponentFixture<QuestModalColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestModalColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestModalColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
