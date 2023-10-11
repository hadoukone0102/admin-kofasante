import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassModalFilterComponent } from './mass-modal-filter.component';

describe('MassModalFilterComponent', () => {
  let component: MassModalFilterComponent;
  let fixture: ComponentFixture<MassModalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassModalFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassModalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
