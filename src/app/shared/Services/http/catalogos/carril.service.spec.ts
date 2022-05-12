import { TestBed } from '@angular/core/testing';

import { CarrilService } from './carril.service';

describe('CarrilService', () => {
  let service: CarrilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
