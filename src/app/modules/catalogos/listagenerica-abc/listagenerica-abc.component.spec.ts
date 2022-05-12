import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagenericaAbcComponent } from './listagenerica-abc.component';

describe('ListagenericaAbcComponent', () => {
  let component: ListagenericaAbcComponent;
  let fixture: ComponentFixture<ListagenericaAbcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagenericaAbcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagenericaAbcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
