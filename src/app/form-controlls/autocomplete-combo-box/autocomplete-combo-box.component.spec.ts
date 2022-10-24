import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteComboBoxComponent } from './autocomplete-combo-box.component';

describe('AutocompleteComboBoxComponent', () => {
  let component: AutocompleteComboBoxComponent;
  let fixture: ComponentFixture<AutocompleteComboBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteComboBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComboBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
