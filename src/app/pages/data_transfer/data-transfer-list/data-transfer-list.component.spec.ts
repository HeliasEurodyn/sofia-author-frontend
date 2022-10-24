import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTransferListComponent } from './data-transfer-list.component';

describe('SofiaImportExportListComponent', () => {
  let component: DataTransferListComponent;
  let fixture: ComponentFixture<DataTransferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTransferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTransferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
