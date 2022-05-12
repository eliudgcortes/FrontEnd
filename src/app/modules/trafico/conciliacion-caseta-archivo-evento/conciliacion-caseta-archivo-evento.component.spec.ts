import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionCasetaArchivoEventoComponent } from './conciliacion-caseta-archivo-evento.component';

describe('ConciliacionCasetaArchivoEventoComponent', () => {
  let component: ConciliacionCasetaArchivoEventoComponent;
  let fixture: ComponentFixture<ConciliacionCasetaArchivoEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaArchivoEventoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaArchivoEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
