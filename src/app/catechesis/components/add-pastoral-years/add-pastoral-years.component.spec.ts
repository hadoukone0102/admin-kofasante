import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPastoralYearsComponent } from './add-pastoral-years.component';

describe('AddPastoralYearsComponent', () => {
  let component: AddPastoralYearsComponent;
  let fixture: ComponentFixture<AddPastoralYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPastoralYearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPastoralYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
