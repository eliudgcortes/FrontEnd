import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGenericaTipoAbcModalComponent } from './lista-generica-tipo-abc-modal.component';

describe('ListaGenericaTipoAbcModalComponent', () => {
  let component: ListaGenericaTipoAbcModalComponent;
  let fixture: ComponentFixture<ListaGenericaTipoAbcModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGenericaTipoAbcModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGenericaTipoAbcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
