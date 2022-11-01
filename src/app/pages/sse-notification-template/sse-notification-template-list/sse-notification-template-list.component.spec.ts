import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SseNotificationTemplateListComponent} from './sse-notification-template-list.component';

describe('SseNotificationTemplateListComponent', () => {
  let component: SseNotificationTemplateListComponent;
  let fixture: ComponentFixture<SseNotificationTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SseNotificationTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SseNotificationTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
