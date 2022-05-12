import { TestBed } from '@angular/core/testing';

import { ListaGenericaTipoService } from './lista-generica-tipo.service';

describe('ListaGenericaTipoService', () => {
  let service: ListaGenericaTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaGenericaTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
