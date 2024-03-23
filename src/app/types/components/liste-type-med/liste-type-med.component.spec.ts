import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypeMedComponent } from './liste-type-med.component';

describe('ListeTypeMedComponent', () => {
  let component: ListeTypeMedComponent;
  let fixture: ComponentFixture<ListeTypeMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTypeMedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTypeMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
