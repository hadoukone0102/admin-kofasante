import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassModalColumnComponent } from './mass-modal-column.component';

describe('MassModalColumnComponent', () => {
  let component: MassModalColumnComponent;
  let fixture: ComponentFixture<MassModalColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassModalColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassModalColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
