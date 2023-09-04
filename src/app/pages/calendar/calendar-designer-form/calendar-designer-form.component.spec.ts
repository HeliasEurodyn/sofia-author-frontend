import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDesignerFormComponent } from './calendar-designer-form.component';

describe('CalendarDesignerFormComponent', () => {
  let component: CalendarDesignerFormComponent;
  let fixture: ComponentFixture<CalendarDesignerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDesignerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
