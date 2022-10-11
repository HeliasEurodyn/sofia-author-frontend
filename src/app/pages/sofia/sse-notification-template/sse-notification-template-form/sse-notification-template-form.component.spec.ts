import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SseNotificationTemplateFormComponent } from './sse-notification-template-form.component';

describe('SseNotificationTemplateFormComponent', () => {
  let component: SseNotificationTemplateFormComponent;
  let fixture: ComponentFixture<SseNotificationTemplateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SseNotificationTemplateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SseNotificationTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
