import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPastoralYearsComponent } from './list-pastoral-years.component';

describe('ListPastoralYearsComponent', () => {
  let component: ListPastoralYearsComponent;
  let fixture: ComponentFixture<ListPastoralYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPastoralYearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPastoralYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
