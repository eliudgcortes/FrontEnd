import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConciliacionCasetaArchivoComponent } from './conciliacion-caseta-archivo.component';

describe('ConciliacionCasetaArchivoComponent', () => {
  let component: ConciliacionCasetaArchivoComponent;
  let fixture: ComponentFixture<ConciliacionCasetaArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaArchivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
