import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassTimeFormComponent } from './mass-time-form.component';

describe('MassTimeFormComponent', () => {
  let component: MassTimeFormComponent;
  let fixture: ComponentFixture<MassTimeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassTimeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassTimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
