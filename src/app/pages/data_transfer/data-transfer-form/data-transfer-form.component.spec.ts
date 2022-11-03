import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DataTransferFormComponent} from './data-transfer-form.component';

describe('SofiaImportExportFormComponent', () => {
  let component: DataTransferFormComponent;
  let fixture: ComponentFixture<DataTransferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTransferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
