import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaGenericaTipoAbcComponent } from './lista-generica-tipo-abc.component';

describe('ListaGenericaTipoAbcComponent', () => {
  let component: ListaGenericaTipoAbcComponent;
  let fixture: ComponentFixture<ListaGenericaTipoAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGenericaTipoAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGenericaTipoAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
