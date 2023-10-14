import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestTypeFormComponent } from './quest-type-form.component';

describe('QuestTypeFormComponent', () => {
  let component: QuestTypeFormComponent;
  let fixture: ComponentFixture<QuestTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
