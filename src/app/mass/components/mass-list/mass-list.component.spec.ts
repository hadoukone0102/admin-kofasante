import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassListComponent } from './mass-list.component';

describe('MassListComponent', () => {
  let component: MassListComponent;
  let fixture: ComponentFixture<MassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
