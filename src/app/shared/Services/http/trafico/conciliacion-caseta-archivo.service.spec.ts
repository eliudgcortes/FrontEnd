import { TestBed } from '@angular/core/testing';

import { ConciliacionCasetaArchivoService } from './conciliacion-caseta-archivo.service';

describe('ConciliacionCasetaArchivoService', () => {
  let service: ConciliacionCasetaArchivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConciliacionCasetaArchivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
