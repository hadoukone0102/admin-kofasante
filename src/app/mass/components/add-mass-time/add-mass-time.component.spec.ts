import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMassTimeComponent } from './add-mass-time.component';

describe('AddMassTimeComponent', () => {
  let component: AddMassTimeComponent;
  let fixture: ComponentFixture<AddMassTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMassTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMassTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
