import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechesisYoungComponent } from './catechesis-young.component';

describe('CatechesisYoungComponent', () => {
  let component: CatechesisYoungComponent;
  let fixture: ComponentFixture<CatechesisYoungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatechesisYoungComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatechesisYoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
