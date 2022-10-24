import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/sofia/component/component-persist-entity-field-dto';

@Component({
  selector: 'app-check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {


  @Input() editable: Boolean;
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();
  @Input() mask: String = '';

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
