import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import {ComponentPersistEntityDTO} from '../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from '../../../dtos/sofia/component/component-persist-entity-field-dto';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @Input() inputDate: Date;
  @Output() inputDateChange = new EventEmitter<Date>();
  @Input() editable: Boolean;
  @Output() keyDownChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() fieldClass: any;
  @Output() focusEvent = new EventEmitter<FocusEvent>();
  @Output() eventOccured = new EventEmitter<any>();
  @Input() componentPersistEntityDTO: ComponentPersistEntityDTO;
  @Input() componentPersistEntityFieldDTO: ComponentPersistEntityFieldDTO;

  @ViewChild('ngbDatepickerIdentifier') ngbInputDatepicker: NgbInputDatepicker;
  model: string;
  convertedMask: String = '';
  @Input() mask = '';
  constructor(element: ElementRef,
              private renderer: Renderer2,
              private _parserFormatter: NgbDateParserFormatter,
              public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.setMaskFormatFromDateFormat();
    this.inputDateToModel();
  }

  setMaskFormatFromDateFormat() {
    const DExp = /D/gi;
    const MExp = /M/gi;
    const YExp = /Y/gi;
    this.convertedMask = this.mask.toUpperCase().replace(DExp, '0').replace(MExp, '0').replace(YExp, '0');
  }

  onKeyDownEvent(event: KeyboardEvent) {
    if (event.key === 'c') {
      this.ngbInputDatepicker.toggle();
    }

    if (event.ctrlKey && event.key === 'z') {
      // alert(JSON.stringify(this.inputDate));
    }

    this.keyDownChange.emit(event);
  }

  onNgbDatepickerSelection(ngbDate: NgbDateStruct) {
    this.inputDate = new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
    this.inputDateToModel();
  }

  inputDateToModel() {
    if (this.inputDate === null) {
      return;
    }
    const dateStringFormated = this.datepipe.transform(this.inputDate, this.mask);
    const exp = /\/|\\|-/gi;
    this.model = dateStringFormated.replace(exp, '');
  }

  onFocusOut() {
    try {
      const modelParsedToDate = this.tryModelToDate();
      if (modelParsedToDate === false) {
        this.model = '';
        this.inputDate = null;
      } else {
        const dateStringFormated = this.datepipe.transform(this.inputDate, this.mask);
        const exp = /\/|\\|-/gi;
        this.model = dateStringFormated.replace(exp, '');
      }
    } catch (error) {
      this.model = '';
      this.inputDate = null;
    }
    this.inputDateChange.emit(this.inputDate);
  }

  tryModelToDate() {
    const currentDate = new Date();

    const exp = /\/|\\|-/gi;
    const modelFormat = this.mask.replace(exp, '');

    const fistIndexOfD = modelFormat.indexOf('d');
    const lastIndexOfD = modelFormat.lastIndexOf('d');

    const fistIndexOfM = modelFormat.indexOf('M');
    const lastIndexOfM = modelFormat.lastIndexOf('M');

    const fistIndexOfY = modelFormat.indexOf('y');
    const lastIndexOfY = modelFormat.lastIndexOf('y');

    const day: number = +this.model.substring(fistIndexOfD, lastIndexOfD + 1);
    let month: number = +this.model.substring(fistIndexOfM, lastIndexOfM + 1);
    let year: number = +this.model.substring(fistIndexOfY, lastIndexOfY + 1);

    if (day <= 0) {
      return false;
    }

    if (month <= 0) {
      month = currentDate.getMonth() + 1;
    }

    if (year <= 0) {
      year = currentDate.getFullYear();
    }

    this.inputDate = new Date(year, month - 1, day);
    return true;
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
  }
}
