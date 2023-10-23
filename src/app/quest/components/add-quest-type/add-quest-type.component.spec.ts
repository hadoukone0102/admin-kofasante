import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestTypeComponent } from './add-quest-type.component';

describe('AddQuestTypeComponent', () => {
  let component: AddQuestTypeComponent;
  let fixture: ComponentFixture<AddQuestTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
