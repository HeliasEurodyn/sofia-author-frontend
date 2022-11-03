import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BusinessUnitDesignerListComponent} from './business-unit-designer-list.component';

describe('BusinessUnitDesginerListComponent', () => {
  let component: BusinessUnitDesignerListComponent;
  let fixture: ComponentFixture<BusinessUnitDesignerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessUnitDesignerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessUnitDesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
