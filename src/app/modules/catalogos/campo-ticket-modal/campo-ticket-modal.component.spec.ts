import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTicketModalComponent } from './campo-ticket-modal.component';

describe('CampoTicketModalComponent', () => {
  let component: CampoTicketModalComponent;
  let fixture: ComponentFixture<CampoTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampoTicketModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
