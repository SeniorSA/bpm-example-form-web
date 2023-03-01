import { TestBed } from '@angular/core/testing';

import { TableCrudService } from './table-crud.service';

describe('TableCrudService', () => {
  let service: TableCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
