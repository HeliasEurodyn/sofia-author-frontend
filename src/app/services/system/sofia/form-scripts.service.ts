import {Injectable} from '@angular/core';
import {DynamicRequestService} from '../../crud/sofia/dynamic-request.service';
import {ComponentPersistEntityDTO} from '../../../dtos/sofia/component/component-persist-entity-dto';
import {ComponentPersistEntityDataLineDTO} from '../../../dtos/sofia/component/component-persist-entity-data-line-dto';
import {FormControlTableDTO} from '../../../dtos/sofia/form/form-control-table-d-t-o';
import {FormControlTableLineDTO} from '../../../dtos/sofia/form/form-control-table-line-d-t-o';
import {FormControlTableCellDTO} from '../../../dtos/sofia/form/form-control-table-cell-d-t-o';
import {FormControlTableControlDTO} from '../../../dtos/sofia/form/form-control-table-control-d-t-o';
import * as uuid from 'uuid';
import {FormComponent} from '../../../pages/sofia/form/form/form.component';
import {TableComponentService} from '../../crud/sofia/table-component.service';
import {ReportPrinterService} from './report-printer.service';
import {DynamicJavaScriptLoaderService} from './dynamic-java-script-loader.service';
import {FormTableLinesService} from '../../../pages/sofia/form/form/services/form-table-lines.service';
import {FormAssignmentsService} from '../../../pages/sofia/form/form/services/form-assignments.service';
import {ComponentObjService} from '../../../pages/sofia/form/form/services/component-obj.service';
import {FormObjService} from '../../../pages/sofia/form/form/services/form-obj.service';
import {CommandNavigatorService} from './command-navigator.service';
import {DynamicStaticJavascriptLoaderService} from './dynamic-static-javascript-loader.service';
import {NotificationService} from './notification.service';

/*
 *  Definition functions that passes function pointers.
 *  This is done for dynamic Javascript to be able to call back to Angular
 */


declare function registerFormDynamicScript(id, form): any;

declare function defineSetFieldEditable(id, callback: ((code: string, editable: boolean, form) => any)): void;

declare function defineGetFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineGetFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function definePostToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function definePostToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function definePutToBackend(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function definePutToUrl(id, callback: ((url: string, data: any, callback: (n: any) => any) => any)): void;

declare function defineDeleteFromBackend(id, callback: ((url: string, callback: (n: any) => any) => any)): void;

declare function defineDeleteFromUrl(id, callback: ((url: string, callback: (n: any) => any) => any)): void;


declare function defineAppendLineToTable(id, callback: ((code: string, fieldValue: any) => any)): void;

declare function defineClearTableLines(id, callback: ((code: string, fieldValue: any) => any)): void;

declare function defineAppendLineToComponent(id, callback: ((component: any, form) => any)): void;

declare function defineGetFormDataset(id, callback: ((form) => any)): void;

declare function defineSetFormTitle(id, callback: ((title: string, form) => any)): void;

declare function defineSetFormDescription(id, callback: ((description: string, form) => any)): void;

declare function defineSetAreaTitle(id, callback: ((code: string, title: string, form) => any)): void;

declare function defineSetAreaDescription(id, callback: ((code: string, description: string, form) => any)): void;

declare function defineSetAreaClass(id, callback: ((code: string, cssClass: string, form) => any)): void;

declare function defineGetArea(id, callback: ((code: string, form) => any)): void;

declare function defineNavigator(id, callback: ((command) => any)): void;

declare function defineSetHeaderTabEditable(id, callback: ((code: string, editable: boolean, form) => any)): void;

declare function defineSetActionButtonEditable(id, callback: ((code: string, editable: boolean, form) => any)): void;

declare function defineSaveFormData(id, callback: ((callback, form) => any)): void;

declare function defineSaveAndBackFormData(id, callback: ((form) => any)): void;

declare function defineDeleteFormData(id, callback: ((form) => any)): void;

// declare function defineDeleteFormData(id, callback: (() => any)): void;

/*
 *  Functions for Angular to call Javascript event handlers .
 */

declare function nativeFormEventsHandler(id, type: string, metadata: any): any;

declare function defineGetParams(id, callback: ((code: string, form) => any)): void;

// declare function nativeTableEventsHandler(tableCode: string, type: string): any;

declare function defineSelectedTabNumberFunction(id, callback: ((message: number, form) => void)): void;

declare function
defineSelectedTextInputDialog(id, callback: ((title: string, description: string, callback: (n: boolean) => any, form) => void)): void;

declare function
defineSelectedTextDialog(id, callback: ((title: string, description: string, form) => void)): void;

declare function
defineNotificationDialog(id, callback: ((horizontalPosition: string, verticalPosition: string,
                                         type: string, icon: string, message: string) => void)): void;

declare function defineSelectedOpenPopupDialog(id, callback: ((message: string, form) => void)): void;

declare function defineSelectedClosePopupDialog(id, callback: ((message: string) => void)): void;

declare function definePrintReport(id, callback: ((reportId: number, parameters: any[]) => void)): void;

declare function defineGetFieldValue(id, callback: ((code: string, form) => any)): void;

declare function defineGetFormFieldsByCode(id, callback: ((code: string, form) => any)): void;

declare function defineSetFieldValue(id, callback: ((code: string, fieldValue: any, form) => any)): void;

declare function defineGetComponentData(id, callback: ((componentId: any, dataId: any, callback: (dataset: any) => any) => any)): void;

declare function defineDataset(id, dataset: any): void;

declare function defineSetTableRowActiveById(id, callback: ((componentCode: string, id: string, form) => void)): void;


declare function nativeButtonClickHandler(id, fieldCode: string): any;

declare function nativeFieldEventsHandler(id, entityCode: string, fieldCode: string, eventtype: string, event: any): any;

declare function nativeTableButtonClickHandler(id, param: string, formControlTable: any, dataLine: any): any;

declare function nativeTableFieldEventsHandler(id, entityCode: string, fieldCode: string, eventtype: string, event: any,
                                               formControlTable: any, dataLine: any): any;

@Injectable({
  providedIn: 'root'
})
export class FormScriptsService {

  constructor(private dynamicRequestService: DynamicRequestService,
              private componentService: TableComponentService,
              private reportPrinterService: ReportPrinterService,
              private dynamicJavaScriptLoader: DynamicJavaScriptLoaderService,
              private formTableLinesService: FormTableLinesService,
              private formAssignmentsService: FormAssignmentsService,
              private componentObjService: ComponentObjService,
              private formObjService: FormObjService,
              private navigatorService: CommandNavigatorService,
              private staticJavascriptLoader: DynamicStaticJavascriptLoaderService,
              private notificationService: NotificationService) {
  }

  public load(form: FormComponent) {
    this.staticJavascriptLoader.addScript('form').then(result => {
      this.dynamicJavaScriptLoader.addScript(form.dto.id, 'form').then(data => {
        registerFormDynamicScript(form.dto.id, form);

        defineSetFieldEditable(form.dto.id, this.setFieldEditable);

        defineGetFromBackend(form.dto.id, this.getFromBackend);
        defineGetFromUrl(form.dto.id, this.getFromUrl);

        definePostToBackend(form.dto.id, this.postToBackend);
        definePostToUrl(form.dto.id, this.postToUrl);
        definePutToBackend(form.dto.id, this.putToBackend);
        definePutToUrl(form.dto.id, this.putToUrl);
        defineDeleteFromBackend(form.dto.id, this.deleteFromBackend);
        defineDeleteFromUrl(form.dto.id, this.deleteFromUrl);


        defineAppendLineToTable(form.dto.id, this.appendLineToTable);
        defineClearTableLines(form.dto.id, this.clearTableLines);
        defineAppendLineToComponent(form.dto.id, this.appendLineToComponent);
        defineGetFormDataset(form.dto.id, this.getFormDataset);
        defineSetFormTitle(form.dto.id, this.setFormTitle);
        defineSetFormDescription(form.dto.id, this.setFormDescription);
        defineSetAreaTitle(form.dto.id, this.setAreaTitle);
        defineSetAreaDescription(form.dto.id, this.setAreaDescription);
        defineSetAreaClass(form.dto.id, this.setAreaClass);
        defineGetArea(form.dto.id, this.getArea);
        defineSetHeaderTabEditable(form.dto.id, this.setHeaderTabEditable);
        defineSetActionButtonEditable(form.dto.id, this.setActionButtonEditable);
        defineSaveFormData(form.dto.id, this.saveFormData);
        defineSaveAndBackFormData(form.dto.id, this.saveAndBackFormData);
        defineDeleteFormData(form.dto.id, this.deleteFormData);
        defineGetParams(form.dto.id, this.getParams);
        defineSelectedTabNumberFunction(form.dto.id, this.setSelectedTabNumber);
        defineSelectedTextInputDialog(form.dto.id, this.textInputDialog);
        defineSelectedTextDialog(form.dto.id, this.textDialog);
        defineNotificationDialog(form.dto.id, this.notificationDialog);
        defineSelectedOpenPopupDialog(form.dto.id, this.openPopup);
        defineSelectedClosePopupDialog(form.dto.id, this.closePopup);
        definePrintReport(form.dto.id, this.printReport);
        defineGetFieldValue(form.dto.id, this.getFieldValue);
        defineGetFormFieldsByCode(form.dto.id, this.getFormFieldsByCode);
        defineSetFieldValue(form.dto.id, this.setFieldValue);
        defineDataset(form.dto.id, form.dto.component.componentPersistEntityList);
        defineGetComponentData(form.dto.id, this.getComponentData);
        defineSetTableRowActiveById(form.dto.id, this.setTableRowActiveById);
        defineNavigator(form.dto.id, this.navigateToCommand);

        this.triggerFormEvent(form.dto.id, 'onFormOpen', 'new');
      }).catch(error => console.log(error));
    });
  }

  public fieldEventOccured(id, entityCode: string, fieldCode: string, eventtype: string, event: any) {
    nativeFieldEventsHandler(
      id,
      entityCode,
      fieldCode,
      eventtype,
      event
    )
  }

  public buttonClickOccured(id, fieldCode: string) {
    nativeButtonClickHandler(id, fieldCode);
  }

  public tableFieldEventOccured(id,
                                entityCode: string,
                                fieldCode: string,
                                eventtype: string,
                                event: any,
                                formControlTable: any,
                                dataLine: any) {
    nativeTableFieldEventsHandler(
      id,
      entityCode,
      fieldCode,
      eventtype,
      event,
      formControlTable,
      dataLine
    );
  }

  public tableButtonClickOccured(id, param: string, formControlTable: any, dataLine: any) {
    nativeTableButtonClickHandler(id, param, formControlTable, dataLine);
  }

  /*
   *  Get Params
   * */
  public getParams = (code: string, form) => {
    if (form.params.has(code)) {
      return form.params.get(code);
    } else {
      return '';
    }
  };

  /*
   *  Save Form Data
   * */
  public saveFormData = (callback, form) => {
    form.save(callback);
  };

  /*
 *  Save Form Data & back
 * */
  public saveAndBackFormData = (form) => {
    form.saveAndBack();
  };


  /*
   *  Delete Form Data
   * */
  public deleteFormData = (form) => {
    form.delete();
  };


  /*
   *  Set Action Button Editable
   * */
  public setActionButtonEditable = (code: string, editable: boolean, form) => {
    for (const actionButton of form.dto.formActionButtons) {
      if (code === actionButton.code) {
        actionButton.editable = editable;
      }
    }
  };

  /*
   *  Set Header Tab Editable
   * */
  public setHeaderTabEditable = (code: string, editable: boolean, form) => {
    for (const formTab of form.dto.formTabs) {
      if (code === formTab.code) {
        formTab.editable = editable;
      }
    }
  };

  /*
   *  Sets form Description
   * */
  public setFormDescription = (description: string, form) => {
    form.dto.description = description;
  };

  public setAreaTitle = (code: string, title: string, form) => {
    const formArea = this.formObjService.getFormAreaByCode(code, form.dto);
    if (formArea == null) {
      return;
    }
    formArea.title = title;
  };

  public setAreaDescription = (code: string, description: string, form) => {
    const formArea = this.formObjService.getFormAreaByCode(code, form.dto);
    if (formArea == null) {
      return;
    }
    formArea.description = description;
  };

  public setAreaClass = (code: string, cssClass: string, form) => {
    const formArea = this.formObjService.getFormAreaByCode(code, form.dto);
    if (formArea == null) {
      return;
    }
    formArea.cssclass = cssClass;
  };

  public getArea = (code: string, form) => {
    const formArea = this.formObjService.getFormAreaByCode(code, form.dto);
    return formArea;
  };

  public navigateToCommand = (command: string) => {
    this.navigatorService.navigate(command);
    return true;
  };

  /*
   *  Sets form Title
   * */
  public setFormTitle = (title: string, form) => {
    form.dto.title = title;
  };

  /*
   *  Enable or disable form controls specified by conponent resist entity field code
   * */
  public setFieldEditable = (fieldCode: string, editable: boolean, form) => {
    const formSections = form.dto.formTabs.concat(form.dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'field') {
            const curFieldCode = formControl.formControlField.componentPersistEntity.code +
              '.' +
              formControl.formControlField.componentPersistEntityField.code;
            if (fieldCode === curFieldCode) {
              formControl.formControlField.editable = editable;
            }
          }
        }
      }
    }
  };

  /*
   *  Get data from backend url
   * */
  public getFromBackend = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.getFromBackend(url).subscribe(data => {
      callback(data);
    });
  };

  public getFromUrl = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.getFromUrl(url).subscribe(data => {
      callback(data);
    });
  };

  public postToBackend = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.postToBackend(url, data).subscribe(response => {
      callback(response);
    });
  };

  public postToUrl = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.postToUrl(url, data).subscribe(response => {
      callback(response);
    });
  };

  public putToBackend = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.putToBackend(url, data).subscribe(response => {
      callback(response);
    });
  };

  public putToUrl = (url: string, data: any, callback: (n: any) => any) => {
    this.dynamicRequestService.putToUrl(url, data).subscribe(response => {
      callback(response);
    });
  };

  public deleteFromBackend = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.deleteFromBackend(url).subscribe(data => {
      callback(data);
    });
  };

  public deleteFromUrl = (url: string, callback: (n: any) => any) => {
    this.dynamicRequestService.deleteFromUrl(url).subscribe(data => {
      callback(data);
    });
  };

  public triggerFormEvent(id, type: string, metadata: any) {
    nativeFormEventsHandler(id, type, metadata);
  }

  public clearTableLines = (code: string, form) => {
    const componentPersistEntity =
      this.componentObjService.findComponentPersistEntity(code, form.dto.component.componentPersistEntityList);
    componentPersistEntity.componentPersistEntityDataLines = [];
    this.refreshTableLinesToForm(componentPersistEntity, form);
  };

  public appendLineToTable = (code: string, form) => {
    const componentPersistEntity =
      this.componentObjService.findComponentPersistEntity(code, form.dto.component.componentPersistEntityList);
    return this.appendLineToComponent(componentPersistEntity, form);
  };

  public getFormDataset = (form) => {
    return form.dto.component;
  };

  public appendLineToComponent = (componentPersistEntity: ComponentPersistEntityDTO, form) => {
    if (componentPersistEntity == null) {
      return null;
    }
    const dataline = this.newComponentPersistEntityDataLine(componentPersistEntity);
    this.refreshTableLinesToForm(componentPersistEntity, form);
    return dataline;
  };

  public refreshTableLinesToForm = (componentPersistEntity: ComponentPersistEntityDTO, form) => {
    if (componentPersistEntity == null) {
      return null;
    }
    this.formTableLinesService.generateFormTableLinesForCpe(form.dto, componentPersistEntity.id);
    let ids = [componentPersistEntity.id];
    ids = this.componentObjService.getChildPersistEntityIds(componentPersistEntity.componentPersistEntityList, ids);
    this.formAssignmentsService.assignComponentFieldsToTableFieldsByPersistEntityIds(form.dto, ids);
  };

  public newComponentPersistEntityDataLine(componentPersistEntity: ComponentPersistEntityDTO): ComponentPersistEntityDataLineDTO {

    /* Create new componentPersistEntityDataLine */
    const componentPersistEntityDataLine = new ComponentPersistEntityDataLineDTO();
    componentPersistEntityDataLine.id = uuid.v4();

    componentPersistEntityDataLine.componentPersistEntityId = componentPersistEntity.id;

    /* Clone component and assign to componentPersistEntityDataLines.component */
    if (componentPersistEntity.defaultComponentPersistEntityFieldList != null) {
      componentPersistEntityDataLine.componentPersistEntityFieldList =
        JSON.parse(JSON.stringify(componentPersistEntity.defaultComponentPersistEntityFieldList));
      // console.log(componentPersistEntityDataLine.componentPersistEntityFieldList);
      componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
    }

    if (componentPersistEntity.defaultComponentPersistEntityList != null) {
      componentPersistEntityDataLine.componentPersistEntityList =
        JSON.parse(JSON.stringify(componentPersistEntity.defaultComponentPersistEntityList));
      componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
    }

    componentPersistEntity.componentPersistEntityDataLines.push(componentPersistEntityDataLine);
    componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
    componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;

    return componentPersistEntityDataLine;
  }

  refershFormTables(form) {
    const formSections = form.dto.formTabs.concat(form.dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'table') {
            this.refershTableFields(formControl.formControlTable);
          }
        }
      }
    }
  }

  public refershTableFields(formControlTableDTO: FormControlTableDTO) {

    /* ReCreate FormControlTableLineDTOs for Table */
    formControlTableDTO.formControlLines = [];
    for (const componentPersistEntityDataLine of formControlTableDTO.componentPersistEntity.componentPersistEntityDataLines) {
      const formControlTableLineDTO: FormControlTableLineDTO = new FormControlTableLineDTO();
      formControlTableLineDTO.componentPersistEntity = new ComponentPersistEntityDTO();
      formControlTableLineDTO.componentPersistEntity.id = formControlTableDTO.componentPersistEntity.id;
      formControlTableLineDTO.componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
      formControlTableLineDTO.componentPersistEntity.componentPersistEntityFieldList =
        componentPersistEntityDataLine.componentPersistEntityFieldList;
      formControlTableLineDTO.componentPersistEntityDataLine = componentPersistEntityDataLine;

      /* ReCreate FormControlTableCellDTO for FormControlTableLineDTOs */
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

  public setSelectedTabNumber = (selectedFormTabNumber: any, form) => {
    form.selectedFormTabId = 0;

    if (form.dto.formTabs.length > 0 && (selectedFormTabNumber + 1) <= form.dto.formTabs.length) {
      form.selectedFormTabId = form.dto.formTabs[selectedFormTabNumber].id;
    } else {
      return;
    }
  };


  public textInputDialog = (title: string, description: string, callback: (n: boolean) => any, form) => {
    form.yesNoDialog.openPopup(title, description, callback);
  };

  public textDialog = (title: string, description: string, form) => {
    form.okDialog.openPopup(title, description);
  };

  public notificationDialog = (horizontalPosition: string, verticalPosition: string, type: string, icon: string, message: string) => {
    this.notificationService.showNotification(horizontalPosition, verticalPosition, type, icon, message);
  };

  public printReport = (reportId: number, parameters: any) => {
    const parameterKeys = Object.keys(parameters);
    const reportParametersMap = new Map();
    parameterKeys.forEach(key => {
      reportParametersMap.set(key, parameters[key]);
    });

    this.reportPrinterService.print(reportId, reportParametersMap);
  };

  public getFieldValue = (fieldCode: string, form) => {
    return this.findValueInComponent(fieldCode, form.dto.component.componentPersistEntityList);
  };

  public getFormFieldsByCode = (fieldCode: string, form) => {
    const formfields = this.formObjService.getFormFieldsByCode(fieldCode, form.dto);
    return formfields;
  };

  findValueInComponent(code: string, componentPersistEntityList: ComponentPersistEntityDTO[]): any {
    for (const componentPersistEntity of componentPersistEntityList) {
      for (const cpef of componentPersistEntity.componentPersistEntityFieldList) {
        const curFieldCode = componentPersistEntity.code + '.' + cpef.code;
        if (code === curFieldCode) {
          return cpef.value;
        }
      }
      const fieldValue = this.findValueInComponent(code, componentPersistEntity.componentPersistEntityList);
      if (fieldValue != null) {
        return fieldValue;
      }
    }
    return null;
  }

  public setFieldValue = (fieldCode: string, fieldValue: any, form) => {
    return this.setValueInComponent(fieldCode, fieldValue, form.dto.component.componentPersistEntityList);
  };

  public setTableRowActiveById = (code: string, id: string, form) => {

    const componentPersistEntity =
      this.componentObjService.findComponentPersistEntity(code, form.dto.component.componentPersistEntityList);
    if (componentPersistEntity == null) {
      return;
    }

    const componentPersistEntityDataLine =
      this.componentObjService.findDatalineByIdInCpe(id, componentPersistEntity);

    if (componentPersistEntityDataLine == null) {
      return;
    }

    componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
    componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;

    const ids = this.componentObjService.getChildPersistEntityIds(componentPersistEntity.componentPersistEntityList, []);
    this.formAssignmentsService.assignComponentFieldsToTableFieldsByPersistEntityIds(form.dto, ids);
  };


  public getComponentData = (componentId: any, dataId: any, callback: (dataset: any) => any) => {
    this.componentService.getDataById(componentId, dataId).subscribe(dataset => {
      callback(dataset);
    });
  };

  setValueInComponent(code: string, newValue: any, componentPersistEntityList: ComponentPersistEntityDTO[]) {
    for (const componentPersistEntity of componentPersistEntityList) {
      for (const cpef of componentPersistEntity.componentPersistEntityFieldList) {
        const curFieldCode = componentPersistEntity.code + '.' + cpef.code;
        if (code === curFieldCode) {
          cpef.value = newValue;
          return true;
        }
      }
      const fieldValue = this.setValueInComponent(code, newValue, componentPersistEntity.componentPersistEntityList);
      if (fieldValue === true) {
        return true;
      }
    }
    return false;
  }

  public openPopup = (code: any, form) => {
    if (code == null) {
      return;
    }

    if (code === '') {
      return;
    }

    form.selectedFormPopupCode = code;

    let codeExists = false;
    form.dto.formPopups.forEach(formPopup => {
      if (code === formPopup.code) {
        codeExists = true;
      }
    });

    if (codeExists === false) {
      return;
    }

    document.getElementById('formPopupModalHandlerId').click();
  };

  public closePopup = (code: any) => {
    if (code == null) {
      return;
    }

    if (code === '') {
      return;
    }

    document.getElementById('formPopupCloseModalHandlerId').click();
  };

  // public updateDataAction = (data: any) => {
  //  // alert(data);
  // };

}
