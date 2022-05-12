import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormControlDto} from '../../../../../dtos/sofia/form/form-control-dto';
import {ComponentDTO} from '../../../../../dtos/sofia/component/componentDTO';
import {FormControlTableLineDTO} from '../../../../../dtos/sofia/form/form-control-table-line-d-t-o';
import {FormControlTableDTO} from '../../../../../dtos/sofia/form/form-control-table-d-t-o';
import {ComponentPersistEntityDTO} from '../../../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityDataLineDTO} from '../../../../../dtos/sofia/component/component-persist-entity-data-line-dto';
import * as uuid from 'uuid';
import {FormControlTableCellDTO} from '../../../../../dtos/sofia/form/form-control-table-cell-d-t-o';
import {FormControlTableControlDTO} from '../../../../../dtos/sofia/form/form-control-table-control-d-t-o';
import {CommandNavigatorService} from '../../../../../services/system/sofia/command-navigator.service';
import {FormComponent} from '../form.component';
import {FormAssignmentsService} from '../services/form-assignments.service';
import {ComponentObjService} from '../services/component-obj.service';
import {FormScriptsService} from '../../../../../services/system/sofia/form-scripts.service';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements OnInit, OnChanges {
  @Input() form: FormComponent;
  @Input() formcontrol: FormControlDto;
  @Input() component: ComponentDTO;
  @Input() refreshUuid: string;

  constructor(private commandNavigatorService: CommandNavigatorService,
              private formAssignmentsService: FormAssignmentsService,
              private componentObjService: ComponentObjService,
              private formScriptsService: FormScriptsService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.refershTableFields(this.formcontrol.formControlTable);
  }

  public setDefaultLinesToFormTablesTree(componentPersistEntityList: ComponentPersistEntityDTO[]) {
    for (const componentPersistEntity of componentPersistEntityList) {
      if (componentPersistEntity.multiDataLine) {
        if (componentPersistEntity.componentPersistEntityDataLines.length === 0) {
          this.newComponentPersistEntityDataLine(componentPersistEntity);
        }
      }

      if (componentPersistEntity.componentPersistEntityList != null) {
        this.setDefaultLinesToFormTablesTree(componentPersistEntity.componentPersistEntityList);
      }
    }
  }

  public tableFieldKeyDown(event: KeyboardEvent,
                           cellId: string,
                           formControlTableLineDTO: FormControlTableLineDTO,
                           formControlTableLineDTOS: FormControlTableLineDTO[],
                           formControlTableDTO: FormControlTableDTO) {

    if (event.ctrlKey && event.key === 'ArrowUp') {
      this.tableFocusPrevLineSameField(cellId, formControlTableLineDTOS, formControlTableLineDTO);
    }

    if (event.ctrlKey && event.key === 'ArrowDown') {
      this.tableFocusNextLineSameField(cellId, formControlTableLineDTOS, formControlTableLineDTO);
    }

    if (event.ctrlKey && event.key === 'ArrowLeft') {
      const focused = this.tableFocusPrevField(cellId, formControlTableLineDTO);
      if (!focused) {
        this.tableFocusPrevLineLastField(formControlTableLineDTOS, formControlTableLineDTO);
      }
    }

    if ((event.ctrlKey && event.key === 'ArrowRight') ||
      event.key === 'Enter') {
      const focused = this.tableFocusNextField(cellId, formControlTableLineDTO);
      if (!focused) {
        const nextLineFocused = this.tableFocusNextLineFirstField(formControlTableLineDTOS, formControlTableLineDTO);
        if (!nextLineFocused) {
          this.tableAddNewLine(formControlTableDTO, formControlTableLineDTOS, formControlTableLineDTO);
        }
      }
    }

    if (event.ctrlKey && event.key === 'Delete') {
      const focused = this.tableFocusPrevLineFirstField(formControlTableLineDTOS, formControlTableLineDTO);
      if (!focused) {
        this.tableFocusNextLineFirstField(formControlTableLineDTOS, formControlTableLineDTO);
      }

      this.tableDeleteLine(formControlTableDTO, formControlTableLineDTOS, formControlTableLineDTO);
    }
  }

  public tableAddNewLine(formControlTableDTO: FormControlTableDTO,
                         formControlTableLineDTOS: FormControlTableLineDTO[],
                         prevFormControlTableLineDTO: FormControlTableLineDTO) {

    if (!formControlTableDTO.editable) {
      return;
    }


    let requiderFieldsFilled = true;
    if (prevFormControlTableLineDTO != null) {
      requiderFieldsFilled = this.checkRequiredFields(prevFormControlTableLineDTO);
    }

    if (requiderFieldsFilled) {
      const componentPersistEntityDataLine = this.newComponentPersistEntityDataLine(formControlTableDTO.componentPersistEntity);
      this.refershTableFields(formControlTableDTO);
      this.tableFocusNextLineFirstField(formControlTableLineDTOS, prevFormControlTableLineDTO);
    }
  }

  public refershTableFields(formControlTableDTO: FormControlTableDTO) {

    // ReCreate FormControlTableLineDTOs for Table
    formControlTableDTO.formControlLines = [];
    for (const componentPersistEntityDataLine of formControlTableDTO.componentPersistEntity.componentPersistEntityDataLines) {
      const formControlTableLineDTO: FormControlTableLineDTO = new FormControlTableLineDTO();
      formControlTableLineDTO.componentPersistEntity = new ComponentPersistEntityDTO();
      formControlTableLineDTO.componentPersistEntity.id = formControlTableDTO.componentPersistEntity.id;
      formControlTableLineDTO.componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
      formControlTableLineDTO.componentPersistEntity.componentPersistEntityFieldList =
        componentPersistEntityDataLine.componentPersistEntityFieldList;
      formControlTableLineDTO.componentPersistEntityDataLine = componentPersistEntityDataLine;

      // ReCreate FormControlTableCellDTO for FormControlTableLineDTOs
      for (const formControl of formControlTableDTO.formControls) {
        let cellFound = false;
        for (const componentPersistEntityField of componentPersistEntityDataLine.componentPersistEntityFieldList) {

          if (componentPersistEntityField.id === formControl.formControlField.fieldId) {
            const formControlTableCellDTO = new FormControlTableCellDTO();
            formControlTableCellDTO.id = uuid.v4();
            formControlTableCellDTO.componentPersistEntityField = componentPersistEntityField;
            formControlTableCellDTO.formControl = formControl;
            formControlTableLineDTO.formControlCells.push(formControlTableCellDTO);
            cellFound = true;
          }
        }

        if (!cellFound) {
          const formControlTableCellDTO =
            this.createTableCellOfFormControlFromComponentPEDataLine(formControl,
              componentPersistEntityDataLine.componentPersistEntityList);
          if (formControlTableCellDTO != null) {
            formControlTableLineDTO.formControlCells.push(formControlTableCellDTO);
          }
        }

      }
      formControlTableDTO.formControlLines.push(formControlTableLineDTO);
    }
  }

  public createTableCellOfFormControlFromComponentPEDataLine(formControl: FormControlTableControlDTO,
                                                             componentPersistEntityList: ComponentPersistEntityDTO[]) {

    for (const componentPersistEntity of componentPersistEntityList) {
      for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
        if (componentPersistEntityField.id === formControl.formControlField.fieldId) {
          const formControlTableCellDTO = new FormControlTableCellDTO();
          formControlTableCellDTO.id = uuid.v4();
          formControlTableCellDTO.componentPersistEntityField = componentPersistEntityField;
          formControlTableCellDTO.formControl = formControl;
          return formControlTableCellDTO;
        }
      }

      if (componentPersistEntity.componentPersistEntityList != null) {
        const formControlTableCellDTO =
          this.createTableCellOfFormControlFromComponentPEDataLine(formControl, componentPersistEntity.componentPersistEntityList);
        if (formControlTableCellDTO != null) {
          return formControlTableCellDTO;
        }
      }
    }

    return null;
  }

  public newComponentPersistEntityDataLine(componentPersistEntity: ComponentPersistEntityDTO) {

    /* Create new componentPersistEntityDataLine */
    const componentPersistEntityDataLine = new ComponentPersistEntityDataLineDTO();
    componentPersistEntityDataLine.id = uuid.v4();

    componentPersistEntityDataLine.componentPersistEntityId = componentPersistEntity.id;

    /* Clone component and assign to componentPersistEntityDataLines.component */
    if (componentPersistEntity.defaultComponentPersistEntityFieldList != null) {
      componentPersistEntityDataLine.componentPersistEntityFieldList =
        JSON.parse(JSON.stringify(componentPersistEntity.defaultComponentPersistEntityFieldList));
    }

    if (componentPersistEntity.defaultComponentPersistEntityList != null) {
      componentPersistEntityDataLine.componentPersistEntityList =
        JSON.parse(JSON.stringify(componentPersistEntity.defaultComponentPersistEntityList));
    }

    componentPersistEntity.componentPersistEntityDataLines.push(componentPersistEntityDataLine);

    return componentPersistEntityDataLine;
  }

  public setSelectedTableLineComponentTreeAndRefreshFormAssignments(componentPersistEntity: ComponentPersistEntityDTO,
                                                                    componentPersistEntityDataLine: ComponentPersistEntityDataLineDTO) {
    componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
    componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
    const ids = this.componentObjService.getChildPersistEntityIds(componentPersistEntity.componentPersistEntityList, []);
    this.formAssignmentsService.assignComponentFieldsToTableFieldsByPersistEntityIds(this.form.dto, ids);
  }

  public setSelectedTableLineComponentTree(componentPersistEntity: ComponentPersistEntityDTO,
                                           componentPersistEntityDataLine: ComponentPersistEntityDataLineDTO) {
    componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
    componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
  }

  public tableAppendNewLine(formControlTableLineDTOS: FormControlTableLineDTO[],
                            formControlTableDTO: FormControlTableDTO) {


    let prevFormControlTableLineDTO = null;

    if (formControlTableLineDTOS.length > 0) {
      prevFormControlTableLineDTO = formControlTableLineDTOS[formControlTableLineDTOS.length - 1];
    }
    this.tableAddNewLine(formControlTableDTO, formControlTableLineDTOS, prevFormControlTableLineDTO);
  }

  public tableDeleteLine(formControlTableDTO: FormControlTableDTO,
                         formControlTableLineDTOS: FormControlTableLineDTO[], formControlTableLineDTO: FormControlTableLineDTO) {

    let elementPosition = 0;
    for (const curFormControlTableLineDTO of formControlTableLineDTOS) {
      if (curFormControlTableLineDTO === formControlTableLineDTO) {
        formControlTableLineDTOS.splice(elementPosition, 1);
        formControlTableDTO.componentPersistEntity.componentPersistEntityDataLines.splice(elementPosition, 1);
        return true;
      }
      elementPosition++;
    }
    return false;
  }

  public checkRequiredFields(formControlTableLineDTO: FormControlTableLineDTO) {

    const formControlCells = Object.assign([], formControlTableLineDTO.formControlCells).filter(
      formControlCell => formControlCell.formControl.type === 'field'
    );

    for (const formControlCell of formControlCells) {
      if ((formControlCell.componentPersistEntityField.value === null ||
        formControlCell.componentPersistEntityField.value === '') &&
        formControlCell.formControl.formControlField.required === true
      ) {
        return false;
      }
    }
    return true;
  }

  public tableFocusPrevLineFirstField(formControlTableLineDTOS: FormControlTableLineDTO[],
                                      formControlTableLineDTO: FormControlTableLineDTO) {

    let controlTableLineDTO: FormControlTableLineDTO = null;
    for (const curFormControlTableLineDTO of formControlTableLineDTOS) {
      if (curFormControlTableLineDTO === formControlTableLineDTO && controlTableLineDTO !== null) {
        const htmlclass =
          controlTableLineDTO.formControlCells[0].id.toString()
        this.focusByClass(htmlclass);
        return true;
      }

      controlTableLineDTO = curFormControlTableLineDTO;
    }
    return false;
  }

  public tableFocusPrevLineSameField(cellId: string, formControlTableLineDTOS: FormControlTableLineDTO[],
                                     formControlTableLineDTO: FormControlTableLineDTO) {

    let prevFormControlTableLineDTO: FormControlTableLineDTO = null;
    for (const CurFormControlTableLineDTO of formControlTableLineDTOS) {
      if (CurFormControlTableLineDTO === formControlTableLineDTO && prevFormControlTableLineDTO !== null) {

        let formControlId = '';
        for (const formControlCell of CurFormControlTableLineDTO.formControlCells) {
          if (cellId === formControlCell.id) {
            formControlId = formControlCell.formControl.id;
          }
        }

        for (const formControlCell of prevFormControlTableLineDTO.formControlCells) {
          if (formControlId === formControlCell.formControl.id) {
            this.focusByClass(formControlCell.id.toString());
            return true;
          }
        }
      }

      prevFormControlTableLineDTO = CurFormControlTableLineDTO;
    }
    return false;
  }

  public tableFocusNextLineSameField(cellId: string, formControlTableLineDTOS: FormControlTableLineDTO[],
                                     formControlTableLineDTO: FormControlTableLineDTO) {

    let currentElementIdFound = false;
    let formControlId = '0';
    for (const curFormControlTableLineDTO of formControlTableLineDTOS) {

      if (currentElementIdFound) {
        for (const formControlCell of curFormControlTableLineDTO.formControlCells) {
          if (formControlId === formControlCell.formControl.id) {
            this.focusByClass(formControlCell.id.toString());
            return true;
          }
        }
      }

      if (curFormControlTableLineDTO === formControlTableLineDTO) {
        for (const formControlCell of curFormControlTableLineDTO.formControlCells) {
          if (cellId === formControlCell.id) {
            formControlId = formControlCell.formControl.id;
          }
        }

        currentElementIdFound = true;
      }
    }
    return false;
  }

  public tableFocusPrevField(id: string, formControlTableLineDTO: FormControlTableLineDTO) {
    let prevElementId = '';
    for (const formControlCell of formControlTableLineDTO.formControlCells) {

      if (id === formControlCell.id && prevElementId !== '') {
        this.focusByClass(prevElementId);
        return true;
      }

      prevElementId = formControlCell.id.toString();
    }

    return false;
  }

  public tableFocusPrevLineLastField(formControlTableLineDTOS: FormControlTableLineDTO[],
                                     formControlTableLineDTO: FormControlTableLineDTO) {

    let prevFormControlTableLineDTO: FormControlTableLineDTO = null;
    for (const curFormControlTableLineDTO of formControlTableLineDTOS) {
      if (curFormControlTableLineDTO === formControlTableLineDTO && prevFormControlTableLineDTO !== null) {
        const htmlclass =
          prevFormControlTableLineDTO.formControlCells[prevFormControlTableLineDTO.formControlCells.length - 1].id.toString();
        this.focusByClass(htmlclass);
        return true;
      }

      prevFormControlTableLineDTO = curFormControlTableLineDTO;
    }
    return false;
  }

  public tableFocusNextField(id: string, formControlTableLineDTO: FormControlTableLineDTO) {
    let currentElementIdFound = false;
    for (const formControlCell of formControlTableLineDTO.formControlCells) {

      if (currentElementIdFound) {
        this.focusByClass(formControlCell.id.toString());
        return true;
      }

      if (id === formControlCell.id) {
        currentElementIdFound = true;
      }
    }
    return false;
  }

  public tableFocusNextLineFirstField(formControlTableLineDTOS: FormControlTableLineDTO[],
                                      formControlTableLineDTO: FormControlTableLineDTO) {

    let curFormControlLineFound = false;
    for (const curFormControlLine of formControlTableLineDTOS) {
      if (curFormControlLineFound) {
        const htmlclass =
          curFormControlLine.formControlCells[0].id.toString();
        this.focusByClass(htmlclass);
        return true;
      }

      if (curFormControlLine === formControlTableLineDTO) {
        curFormControlLineFound = true;
      }
    }
    return false;
  }

  public tableFocusFirstLineFirstField(formControlLines: FormControlTableLineDTO[]) {
    for (const formControlLine of formControlLines) {
      const htmlclass =
        formControlLine.formControlCells[0].id.toString()
      this.focusByClass(htmlclass);

      return true;
    }
    return false;
  }

  public focusByClass(selectedClass: string) {
    const elements = document.getElementsByClassName(selectedClass);
    if (elements.length === 1) {
      const htmlELement = elements[0] as HTMLElement;
      htmlELement.focus();
      return true;
    }
    return false;
  }

  formButtonClicked(tableFormControlButton: FormControlTableControlDTO,
                    formControlLine: FormControlTableLineDTO,
                    formControlLines: FormControlTableLineDTO[],
                    formcontrol: FormControlDto,
                    formControlTable: FormControlTableDTO) {

    this.formScriptsService.tableButtonClickOccured(
      this.form.dto.id,
      tableFormControlButton.formControlButton.code,
      formcontrol.formControlTable,
      formControlLine.componentPersistEntityDataLine);

    let command = tableFormControlButton.formControlButton.editor;

    if (command === '#deleteLine') {
      this.tableDeleteLine(formControlTable, formControlLines, formControlLine);
      return;
    }

    if (command === '#selectLine') {
      this.setSelectedTableLineComponentTreeAndRefreshFormAssignments(formcontrol.formControlTable.componentPersistEntity,
        formControlLine.componentPersistEntityDataLine);
      return;
    }

    if (command === '') {
      return;
    }

    formControlLine.formControlCells.forEach((formControlCell, index) => {
      command = command.replace('#' + formControlCell.componentPersistEntityField.code,
        formControlCell.componentPersistEntityField.value);
    });

    this.commandNavigatorService.navigate(command);
  }

  tableEventOccured(fieldParameters: any,
                    componentPersistEntity: ComponentPersistEntityDTO,
                    componentPersistEntityDataLine: ComponentPersistEntityDataLineDTO) {
    this.formScriptsService.tableFieldEventOccured(
      this.form.dto.id,
      fieldParameters['entityCode'],
      fieldParameters['fieldCode'],
      fieldParameters['eventtype'],
      fieldParameters['event'],
      componentPersistEntity,
      componentPersistEntityDataLine
    );
  }
}
