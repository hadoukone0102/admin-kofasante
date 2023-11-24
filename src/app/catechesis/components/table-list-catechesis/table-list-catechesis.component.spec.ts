import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListCatechesisComponent } from './table-list-catechesis.component';

describe('TableListCatechesisComponent', () => {
  let component: TableListCatechesisComponent;
  let fixture: ComponentFixture<TableListCatechesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListCatechesisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableListCatechesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
