import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasetasComponent } from './casetas.component';

describe('CasetasComponent', () => {
  let component: CasetasComponent;
  let fixture: ComponentFixture<CasetasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CasetasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasetasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
