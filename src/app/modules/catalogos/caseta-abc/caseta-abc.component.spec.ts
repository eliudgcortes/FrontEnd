import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetaAbcComponent } from './caseta-abc.component';

describe('CasetaAbcComponent', () => {
  let component: CasetaAbcComponent;
  let fixture: ComponentFixture<CasetaAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasetaAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetaAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
