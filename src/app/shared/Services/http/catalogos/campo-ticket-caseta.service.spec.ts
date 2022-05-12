import { TestBed } from '@angular/core/testing';

import { CampoTicketCasetaService } from './campo-ticket-caseta.service';

describe('CampoTicketCasetaService', () => {
  let service: CampoTicketCasetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampoTicketCasetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
