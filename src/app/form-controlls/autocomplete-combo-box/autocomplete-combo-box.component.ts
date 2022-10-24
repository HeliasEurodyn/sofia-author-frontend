import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/component/component-persist-entity-field-dto';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {CustomQueryDesignerService} from '../../services/crud/custom-query-designer.service';
import {CustomQueryService} from '../../services/crud/custom-query.service';

@Component({
  selector: 'app-autocomplete-combo-box',
  templateUrl: './autocomplete-combo-box.component.html',
  styleUrls: ['./autocomplete-combo-box.component.css']
})
export class AutocompleteComboBoxComponent implements OnInit, AfterViewInit {

  public model: any;
  @Input() editable: Boolean;
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  @Output() eventOccured = new EventEmitter<any>();
  comboOptions: any;
  @ViewChild('instance') input: ElementRef;

  constructor(private customQueryService: CustomQueryService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.retrieveData();
  }

  retrieveData(): void {
    this.comboOptions = JSON.parse(this.componentPersistEntityFieldDTO.assignment.editor);
    if (this.comboOptions['custom-query']) {
      const data = [];
      this.customQueryService.getData(this.comboOptions['custom-query']).subscribe(responce => {
        for (const dataRow of responce) {
          const dr = {
            value: '', display: ''
          }
          dr['value'] = dataRow[0];
          dr['display'] = dataRow[1];
          data.push(dr);
        }
        this.comboOptions['data'] = data;
        this.defaultValuesetUp();
      });
    } else {
      this.defaultValuesetUp();
    }
  }

  defaultValuesetUp(): void {
    if (this.componentPersistEntityFieldDTO.value == null) {
      return;
    }

    this.input.nativeElement.value = '';
    this.comboOptions['data'].filter(option => (option.value.toString() === this.componentPersistEntityFieldDTO.value.toString())
    ).forEach(option => {
      this.input.nativeElement.value = option.display;
      this.model = option;
    });
  }

  eventOccuredActions(eventtype: string, event: any) {
    this.eventOccured.emit(
      {
        entityCode: this.componentPersistEntityDTO.code,
        fieldCode: this.componentPersistEntityFieldDTO.code,
        eventtype: eventtype,
        event: event
      }
    );
  }

  clearValue() {
    this.componentPersistEntityFieldDTO.value = null;
  }

  selectItem($event: any) {
    if ($event === 'null' || $event === 'undefined') {
      this.componentPersistEntityFieldDTO.value = null;
    } else {
      this.componentPersistEntityFieldDTO.value = $event;
    }
  }

  focusInputField(input) {
    input.focus();
    input.select();
  }

  formatter = (selection: any) => selection.display;

  search: OperatorFunction<string, readonly { id, name }[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 0),
    map(val => this.comboOptions['data'].filter(state => new RegExp((val === '' ? '.' : val), 'mi').test(state['display'])))
  )

  public onFocus(e: Event): void {
    e.stopPropagation();
    setTimeout(() => {
      const inputEvent: Event = new Event('input');
      e.target.dispatchEvent(inputEvent);
    }, 0);
  }

  focusoutTriggered(input, $event: FocusEvent) {
    if (this.model == null) {
      input.value = '';
      this.componentPersistEntityFieldDTO.value = null;
    }
  }

  clear(input) {
    this.model = null;
    input.value = '';
    this.componentPersistEntityFieldDTO.value = null;
  }

  updateModel(event: any) {
    this.model = event.item;
    this.componentPersistEntityFieldDTO.value = this.model['value'];
  }
}
