import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBasketMassComponent } from './list-basket-mass.component';

describe('ListBasketMassComponent', () => {
  let component: ListBasketMassComponent;
  let fixture: ComponentFixture<ListBasketMassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBasketMassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBasketMassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
