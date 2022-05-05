import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorProductCpeListComponent } from './vendor-product-cpe-list.component';

describe('VendorProductCpeListComponent', () => {
  let component: VendorProductCpeListComponent;
  let fixture: ComponentFixture<VendorProductCpeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorProductCpeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductCpeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
