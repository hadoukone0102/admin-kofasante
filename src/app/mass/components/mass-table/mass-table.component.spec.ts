import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassTableComponent } from './mass-table.component';

describe('MassTableComponent', () => {
  let component: MassTableComponent;
  let fixture: ComponentFixture<MassTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
