import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrilModalComponent } from './carril-modal.component';

describe('CarrilModalComponent', () => {
  let component: CarrilModalComponent;
  let fixture: ComponentFixture<CarrilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrilModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
