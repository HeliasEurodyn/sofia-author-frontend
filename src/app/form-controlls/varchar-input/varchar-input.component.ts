import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/component/component-persist-entity-field-dto';

declare function nativeFieldEventsHandler(entityCode: string, fieldName: string, eventtype: string, event: any): any;

@Component({
  selector: 'app-varchar-input',
  templateUrl: './varchar-input.component.html',
  styleUrls: ['./varchar-input.component.css']
})
export class VarcharInputComponent implements OnInit {

  @Input() editable: Boolean;
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();
  @Input() mask: String = '';
  public customPatterns = { 'J': { pattern: new RegExp('\[a-zA-Z\\-0-9\]')} };

  constructor() {
  }

  ngOnInit(): void {
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

  keyDownTriggered($event: KeyboardEvent) {
    this.keydownEvent.emit($event);
  }

  focusTriggered($event: FocusEvent) {
    this.focusEvent.emit($event);
  }

}
