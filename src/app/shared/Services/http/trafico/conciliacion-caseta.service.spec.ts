import { TestBed } from '@angular/core/testing';

import { ConciliacionCasetaService } from './conciliacion-caseta.service';

describe('ConciliacionCasetaService', () => {
  let service: ConciliacionCasetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciliacionCasetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
