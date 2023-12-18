import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAsctuceComponent } from './add-asctuce.component';

describe('AddAsctuceComponent', () => {
  let component: AddAsctuceComponent;
  let fixture: ComponentFixture<AddAsctuceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAsctuceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAsctuceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
