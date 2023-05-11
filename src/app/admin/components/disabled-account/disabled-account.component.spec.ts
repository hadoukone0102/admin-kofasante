import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabledAccountComponent } from './disabled-account.component';

describe('DisabledAccountComponent', () => {
  let component: DisabledAccountComponent;
  let fixture: ComponentFixture<DisabledAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabledAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisabledAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
