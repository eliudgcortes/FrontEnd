import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGenericaTipoComponent } from './lista-generica-tipo.component';

describe('ListaGenericaTipoComponent', () => {
  let component: ListaGenericaTipoComponent;
  let fixture: ComponentFixture<ListaGenericaTipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGenericaTipoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGenericaTipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
