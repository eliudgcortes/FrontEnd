import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionCasetaArchivoModalComponent } from './conciliacion-caseta-archivo-modal.component';

describe('ConciliacionCasetaArchivoModalComponent', () => {
  let component: ConciliacionCasetaArchivoModalComponent;
  let fixture: ComponentFixture<ConciliacionCasetaArchivoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaArchivoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaArchivoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
