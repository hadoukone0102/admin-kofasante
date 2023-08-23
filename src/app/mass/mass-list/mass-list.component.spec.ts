import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMassComponent } from './mass-list.component';

describe('ListMassComponent', () => {
  let component: ListMassComponent;
  let fixture: ComponentFixture<ListMassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
