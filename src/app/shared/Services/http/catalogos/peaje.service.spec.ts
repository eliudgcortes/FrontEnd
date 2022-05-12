import { TestBed } from '@angular/core/testing';

import { PeajeService } from './peaje.service';

describe('PeajeService', () => {
  let service: PeajeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeajeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
