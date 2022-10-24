import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../dtos/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../dtos/component/component-persist-entity-field-dto';

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {
  @Input() editable: Boolean;
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;
  @Output() keydownEvent = new EventEmitter<KeyboardEvent>();
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();
  comboOptions: any;

  constructor() {
  }

  ngOnInit(): void {
    this.comboOptions = JSON.parse(this.componentPersistEntityFieldDTO.assignment.editor);
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

}
