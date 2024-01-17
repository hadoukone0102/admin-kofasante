import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinePageComponent } from './medecine-page.component';

describe('MedecinePageComponent', () => {
  let component: MedecinePageComponent;
  let fixture: ComponentFixture<MedecinePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedecinePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
