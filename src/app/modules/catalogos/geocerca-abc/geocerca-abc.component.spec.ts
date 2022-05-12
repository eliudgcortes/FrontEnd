import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeocercaAbcComponent } from './geocerca-abc.component';

describe('GeocercaAbcComponent', () => {
  let component: GeocercaAbcComponent;
  let fixture: ComponentFixture<GeocercaAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeocercaAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeocercaAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
