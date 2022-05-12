import { TestBed } from '@angular/core/testing';

import { CasetaService } from './caseta.service';

describe('CasetasService', () => {
  let service: CasetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
