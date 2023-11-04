import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestBasketComponent } from './quest-basket.component';

describe('QuestBasketComponent', () => {
  let component: QuestBasketComponent;
  let fixture: ComponentFixture<QuestBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestBasketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
