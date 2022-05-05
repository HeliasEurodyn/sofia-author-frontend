import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityFormComponent } from './security-form.component';

describe('SecurityFormComponent', () => {
  let component: SecurityFormComponent;
  let fixture: ComponentFixture<SecurityFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
