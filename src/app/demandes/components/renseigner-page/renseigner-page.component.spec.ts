import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenseignerPageComponent } from './renseigner-page.component';

describe('RenseignerPageComponent', () => {
  let component: RenseignerPageComponent;
  let fixture: ComponentFixture<RenseignerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenseignerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenseignerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
