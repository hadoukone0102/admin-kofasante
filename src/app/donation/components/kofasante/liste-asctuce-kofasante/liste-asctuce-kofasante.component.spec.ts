import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAsctuceKofasanteComponent } from './liste-asctuce-kofasante.component';

describe('ListeAsctuceKofasanteComponent', () => {
  let component: ListeAsctuceKofasanteComponent;
  let fixture: ComponentFixture<ListeAsctuceKofasanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeAsctuceKofasanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeAsctuceKofasanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
