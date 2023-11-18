import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddPastoralComponent } from './form-add-pastoral.component';

describe('FormAddPastoralComponent', () => {
  let component: FormAddPastoralComponent;
  let fixture: ComponentFixture<FormAddPastoralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddPastoralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAddPastoralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
