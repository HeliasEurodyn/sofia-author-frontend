import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/sofia/component/component-persist-entity-field-dto';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.css']
})
export class NumericInputComponent implements OnInit {

  @Input() inputValue: any;
  @Output() inputValueChange = new EventEmitter<any>();
  @Input() mask: String = '';
  @Input() editable: Boolean;
  @Output() keyDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() fieldClass: any;
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  @Output() eventOccured = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  onKeyUp($event: KeyboardEvent) {

    if ($event.key === '.') {
      if (
        (this.inputValue === '' || this.inputValue == null)
        && this.mask.includes('.')) {
        this.inputValue = '0.';
      }
    }
    this.inputValueChange.emit(this.inputValue);
    this.eventOccuredActions('keyup', $event);
  }

  onKeyDown($event: KeyboardEvent) {
    this.keyDownChange.emit($event);
    this.eventOccuredActions('keydown', $event);
  }

  focusTriggered($event: FocusEvent) {
    this.focusEvent.emit($event);
  }

  eventOccuredActions(eventtype: string, event: any) {
    if (this.componentPersistEntityDTO == null) {
      return;
    }
    this.eventOccured.emit(
      {
        entityCode: this.componentPersistEntityDTO.code,
        fieldCode: this.componentPersistEntityFieldDTO.code,
        eventtype: eventtype,
        event: event
      }
    );

    // if (typeof nativeFieldEventsHandler !== 'function') {
    //   return;
    // }
    //
    // nativeFieldEventsHandler(this.componentPersistEntityDTO.code,
    //   this.componentPersistEntityFieldDTO.code,
    //   eventtype,
    //   event);
  }

}
