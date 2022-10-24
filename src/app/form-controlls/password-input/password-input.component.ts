import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/sofia/component/component-persist-entity-field-dto';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {


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
