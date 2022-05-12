import { TestBed } from '@angular/core/testing';

import { VerificaTokenService } from './verifica-token.service';

describe('VerificaTokenService', () => {
  let service: VerificaTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerificaTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
