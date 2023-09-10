import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassTimeListComponent } from './mass-time-list.component';

describe('MassTimeListComponent', () => {
  let component: MassTimeListComponent;
  let fixture: ComponentFixture<MassTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassTimeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassTimeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
