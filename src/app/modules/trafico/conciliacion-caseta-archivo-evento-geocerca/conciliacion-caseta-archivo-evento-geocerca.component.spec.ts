import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionCasetaArchivoEventoGeocercaComponent } from './conciliacion-caseta-archivo-evento-geocerca.component';

describe('ConciliacionCasetaArchivoEventoGeocercaComponent', () => {
  let component: ConciliacionCasetaArchivoEventoGeocercaComponent;
  let fixture: ComponentFixture<ConciliacionCasetaArchivoEventoGeocercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaArchivoEventoGeocercaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaArchivoEventoGeocercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
