import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePastoralYearsComponent } from './table-pastoral-years.component';

describe('TablePastoralYearsComponent', () => {
  let component: TablePastoralYearsComponent;
  let fixture: ComponentFixture<TablePastoralYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePastoralYearsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePastoralYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
