import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuestTypeComponent } from './edit-quest-type.component';

describe('EditQuestTypeComponent', () => {
  let component: EditQuestTypeComponent;
  let fixture: ComponentFixture<EditQuestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuestTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditQuestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
