import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDesginerListComponent } from './calendar-desginer-list.component';

describe('CalendarDesginerListComponent', () => {
  let component: CalendarDesginerListComponent;
  let fixture: ComponentFixture<CalendarDesginerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDesginerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDesginerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
