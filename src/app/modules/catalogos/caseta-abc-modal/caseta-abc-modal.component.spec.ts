import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetaAbcModalComponent } from './caseta-abc-modal.component';

describe('CasetaAbcModalComponent', () => {
  let component: CasetaAbcModalComponent;
  let fixture: ComponentFixture<CasetaAbcModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasetaAbcModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetaAbcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
