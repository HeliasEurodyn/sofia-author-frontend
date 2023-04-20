import { TestBed } from '@angular/core/testing';

import { RuleDesignerService } from './rule-designer.service';

describe('RuleService', () => {
  let service: RuleDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuleDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
