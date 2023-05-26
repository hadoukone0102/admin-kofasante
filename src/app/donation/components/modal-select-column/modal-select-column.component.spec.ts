import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectColumnComponent } from './modal-select-column.component';

describe('ModalSelectColumnComponent', () => {
  let component: ModalSelectColumnComponent;
  let fixture: ComponentFixture<ModalSelectColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectColumnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
