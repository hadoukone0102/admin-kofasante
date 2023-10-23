import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMassTimeComponent } from './edit-mass-time.component';

describe('EditMassTimeComponent', () => {
  let component: EditMassTimeComponent;
  let fixture: ComponentFixture<EditMassTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMassTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMassTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
