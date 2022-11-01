import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessUnitDesignerFormComponent} from './business-unit-designer-form.component';

describe('BusinessUnitDesginerFormComponent', () => {
  let component: BusinessUnitDesignerFormComponent;
  let fixture: ComponentFixture<BusinessUnitDesignerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitDesignerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitDesignerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
