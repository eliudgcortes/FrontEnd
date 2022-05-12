import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagenericaComponent } from './listagenerica.component';

describe('ListagenericaComponent', () => {
  let component: ListagenericaComponent;
  let fixture: ComponentFixture<ListagenericaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagenericaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagenericaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
