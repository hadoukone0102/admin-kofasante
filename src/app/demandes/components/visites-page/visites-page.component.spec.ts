import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitesPageComponent } from './visites-page.component';

describe('VisitesPageComponent', () => {
  let component: VisitesPageComponent;
  let fixture: ComponentFixture<VisitesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
