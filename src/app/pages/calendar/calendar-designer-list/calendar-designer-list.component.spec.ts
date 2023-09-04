import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDesignerListComponent } from './calendar-designer-list.component';

describe('CalendarDesignerListComponent', () => {
  let component: CalendarDesignerListComponent;
  let fixture: ComponentFixture<CalendarDesignerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDesignerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
