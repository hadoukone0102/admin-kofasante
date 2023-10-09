import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassAnonymousRequestComponent } from './mass-anonymous-request.component';

describe('MassAnonymousRequestComponent', () => {
  let component: MassAnonymousRequestComponent;
  let fixture: ComponentFixture<MassAnonymousRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassAnonymousRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassAnonymousRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
