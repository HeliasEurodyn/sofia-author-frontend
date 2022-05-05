import {Injectable} from '@angular/core';
import {ComponentPersistEntityDTO} from '../../../../../dtos/sofia/component/component-persist-entity-dto';
import {FormControlDto} from '../../../../../dtos/sofia/form/form-control-dto';
import {FormControlTableControlDTO} from '../../../../../dtos/sofia/form/form-control-table-control-d-t-o';
import {FormDto} from '../../../../../dtos/sofia/form/form-dto';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class FormAssignmentsService {

  constructor() {
  }

  /*
  *
  * This function does the below
  *  1. Adds assignment pointers from Component default PersistEntityFields  to table ComponentPersistEntityFields
  *  2. Assigns temporary ids to the ComponentPersistEntity DataLines
  *
  * */
  public addAssignmentsToTableDataLines(componentPersistEntityList: ComponentPersistEntityDTO[]): ComponentPersistEntityDTO[] {

    for (const cpe of componentPersistEntityList) {
      if (cpe.multiDataLine === true && cpe.componentPersistEntityDataLines != null) {
        let cpeDatalineTempId = 0;
        for (const cpeDl of cpe.componentPersistEntityDataLines) {
          cpeDl.id = cpeDatalineTempId;
          let position = 0;
          for (const cpeF of cpeDl.componentPersistEntityFieldList) {
            cpeF.assignment = cpe.defaultComponentPersistEntityFieldList[position].assignment;
            position++;
          }

          if (cpeDl.componentPersistEntityList != null) {
            cpeDl.componentPersistEntityList = this.addAssignmentsToTableDataLines(cpeDl.componentPersistEntityList);
          }

          cpeDatalineTempId++;
        }
      }

      if (cpe.componentPersistEntityList != null) {
        cpe.componentPersistEntityList = this.addAssignmentsToTableDataLines(cpe.componentPersistEntityList);
      }
    }

    return componentPersistEntityList;
  }

  public assignComponentFieldsToFormFields(dto: FormDto): FormDto {
    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'field') {
            const componentPersistEntityFieldArray =
              this.getComponentPersistEntityFieldByIdOnTree(dto.component.componentPersistEntityList,
                formControl.formControlField.fieldId);
            if (componentPersistEntityFieldArray != null) {
              formControl.formControlField.componentPersistEntity = componentPersistEntityFieldArray[0];
              formControl.formControlField.componentPersistEntityField = componentPersistEntityFieldArray[1];
            }
          } else if (formControl.type === 'table') {
            this.assignControlToFormControlTable(formControl, dto);
            formControl.refreshUuid = uuid.v4();
          }
        }
      }
    }

    return dto;
  }

  public assignComponentFieldsToTableFieldsByPersistEntityIds(dto: FormDto, ids: number[]): FormDto {
    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'table' && ids.includes(formControl.formControlTable.componentPersistEntity.id)) {
            this.assignControlToFormControlTable(formControl, dto);
            formControl.refreshUuid = uuid.v4();
          }
        }
      }
    }

    return dto;
  }

  private getComponentPersistEntityFieldByIdOnTree(componentPersistEntityList: ComponentPersistEntityDTO[], fieldId) {
    for (const componentPersistEntity of componentPersistEntityList) {
      for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
        if (componentPersistEntityField.id === fieldId) {
          return [componentPersistEntity, componentPersistEntityField];
        }
      }
      if (componentPersistEntity.componentPersistEntityList != null) {
        const componentPersistEntityFieldArray =
          this.getComponentPersistEntityFieldByIdOnTree(componentPersistEntity.componentPersistEntityList, fieldId);
        if (componentPersistEntityFieldArray != null) {
          return componentPersistEntityFieldArray;
        }
      }
    }
    return null;
  }

  private assignControlToFormControlTable(formControlDto: FormControlDto, dto: FormDto) {

    // Assign component persist entity to formControlTable
    this.assignComponentPersistEntityFromTreeToTableFormControl(dto.component.componentPersistEntityList, formControlDto);

    // Assign component persist entity fields to formControlTable.formControls
    for (const formControl of formControlDto.formControlTable.formControls) {
      this.assignComponentPersistEntityFieldFromTreeToFormControl(dto.component.componentPersistEntityList, formControl);
    }

  }

  private assignComponentPersistEntityFromTreeToTableFormControl(componentPersistEntityList: ComponentPersistEntityDTO[],
                                                                 formControlDto: FormControlDto) {
    for (const componentPersistEntity of componentPersistEntityList) {
      if (componentPersistEntity.id === formControlDto.formControlTable.componentPersistEntity.id) {
        formControlDto.formControlTable.componentPersistEntity = componentPersistEntity;
        formControlDto.formControlTable.componentPersistEntity.multiDataLine = true;
        return true;
      }

      if (componentPersistEntity.componentPersistEntityList != null) {
        const result = this.assignComponentPersistEntityFromTreeToTableFormControl(componentPersistEntity.componentPersistEntityList,
          formControlDto);
        if (result) {
          return true;
        }
      }
    }

    return false;
  }

  private assignComponentPersistEntityFieldFromTreeToFormControl(componentPersistEntityList: ComponentPersistEntityDTO[],
                                                                 formControl: FormControlTableControlDTO) {
    for (const componentPersistEntity of componentPersistEntityList) {
      for (const componentPersistEntityField of componentPersistEntity.componentPersistEntityFieldList) {
        if (componentPersistEntityField.id === formControl.formControlField.fieldId) {
          formControl.formControlField.componentPersistEntityField = componentPersistEntityField;
          formControl.formControlField.componentPersistEntity = componentPersistEntity;
          return true;
        }
      }

      if (componentPersistEntity.componentPersistEntityList != null) {
        const result = this.assignComponentPersistEntityFieldFromTreeToFormControl(componentPersistEntity.componentPersistEntityList,
          formControl);
        if (result) {
          return true;
        }
      }
    }

    return false;
  }

}
