import { TestBed } from '@angular/core/testing';

import { PivotListService } from './pivot-list.service';

describe('PivotListService', () => {
  let service: PivotListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PivotListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
