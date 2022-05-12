import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionCasetaAbcComponent } from './conciliacion-caseta-abc.component';

describe('ConciliacionCasetaAbcComponent', () => {
  let component: ConciliacionCasetaAbcComponent;
  let fixture: ComponentFixture<ConciliacionCasetaAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
