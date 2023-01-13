import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDesginerFormComponent } from './calendar-desginer-form.component';

describe('CalendarDesginerFormComponent', () => {
  let component: CalendarDesginerFormComponent;
  let fixture: ComponentFixture<CalendarDesginerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDesginerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDesginerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
