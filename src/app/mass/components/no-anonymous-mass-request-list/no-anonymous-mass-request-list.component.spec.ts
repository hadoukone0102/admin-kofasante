import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoAnonymousMassRequestListComponent } from './no-anonymous-mass-request-list.component';

describe('NoAnonymousMassRequestListComponent', () => {
  let component: NoAnonymousMassRequestListComponent;
  let fixture: ComponentFixture<NoAnonymousMassRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoAnonymousMassRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoAnonymousMassRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
