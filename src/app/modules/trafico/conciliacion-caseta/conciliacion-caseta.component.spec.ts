import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliacionCasetaComponent } from './conciliacion-caseta.component';

describe('ConciliacionCasetaComponent', () => {
  let component: ConciliacionCasetaComponent;
  let fixture: ComponentFixture<ConciliacionCasetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConciliacionCasetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliacionCasetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
