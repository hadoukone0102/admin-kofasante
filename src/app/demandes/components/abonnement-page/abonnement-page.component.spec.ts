import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonnementPageComponent } from './abonnement-page.component';

describe('AbonnementPageComponent', () => {
  let component: AbonnementPageComponent;
  let fixture: ComponentFixture<AbonnementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbonnementPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbonnementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
