import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturePagesComponent } from './facture-pages.component';

describe('FacturePagesComponent', () => {
  let component: FacturePagesComponent;
  let fixture: ComponentFixture<FacturePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
