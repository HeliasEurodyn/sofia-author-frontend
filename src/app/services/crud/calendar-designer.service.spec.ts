import { TestBed } from '@angular/core/testing';

import { CalendarDesignerService } from './calendar-designer.service';

describe('CalendarDesignerService', () => {
  let service: CalendarDesignerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarDesignerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
