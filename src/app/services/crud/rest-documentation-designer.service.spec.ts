import { TestBed } from '@angular/core/testing';

import { RestDocumentationDesignerService } from './rest-documentation-designer.service';

describe('RestDocumentationDesignerService', () => {
  let service: RestDocumentationDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestDocumentationDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
