import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassRequestTableComponent } from './mass-request-table.component';

describe('MassRequestTableComponent', () => {
  let component: MassRequestTableComponent;
  let fixture: ComponentFixture<MassRequestTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassRequestTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassRequestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
