import { TestBed } from '@angular/core/testing';

import { ViaCepService } from './via-cep.service';

describe('ViaCepServiceService', () => {
  let service: ViaCepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViaCepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
