import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymousMassRequestListComponent } from './anonymous-mass-request-list.component';

describe('AnonymousMassRequestListComponent', () => {
  let component: AnonymousMassRequestListComponent;
  let fixture: ComponentFixture<AnonymousMassRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonymousMassRequestListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonymousMassRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
