import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmCodeSmsComponent } from './confirm-code-sms.component';

describe('ConfirmCodeSmsComponent', () => {
  let component: ConfirmCodeSmsComponent;
  let fixture: ComponentFixture<ConfirmCodeSmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmCodeSmsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmCodeSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
