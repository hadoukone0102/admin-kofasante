import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMassComponent } from './edit-mass.component';

describe('EditMassComponent', () => {
  let component: EditMassComponent;
  let fixture: ComponentFixture<EditMassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
