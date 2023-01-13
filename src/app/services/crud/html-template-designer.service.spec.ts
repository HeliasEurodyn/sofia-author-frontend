import { TestBed } from '@angular/core/testing';

import { HtmlTemplateDesignerService } from './html-template-designer.service';

describe('HtmlTemplateDesignerService', () => {
  let service: HtmlTemplateDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HtmlTemplateDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
