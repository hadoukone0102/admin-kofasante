import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KofaPaiementComponent } from './kofa-paiement.component';

describe('KofaPaiementComponent', () => {
  let component: KofaPaiementComponent;
  let fixture: ComponentFixture<KofaPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KofaPaiementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KofaPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
