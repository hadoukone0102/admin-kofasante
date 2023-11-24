import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatechesisAdultComponent } from './catechesis-adult.component';

describe('CatechesisAdultComponent', () => {
  let component: CatechesisAdultComponent;
  let fixture: ComponentFixture<CatechesisAdultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatechesisAdultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatechesisAdultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
