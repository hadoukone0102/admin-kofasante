import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTypeDocComponent } from './liste-type-doc.component';

describe('ListeTypeDocComponent', () => {
  let component: ListeTypeDocComponent;
  let fixture: ComponentFixture<ListeTypeDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeTypeDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTypeDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
