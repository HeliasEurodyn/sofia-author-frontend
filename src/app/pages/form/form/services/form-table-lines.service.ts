import {Injectable} from '@angular/core';
import {FormControlTableDTO} from '../../../../dtos/sofia/form/form-control-table-d-t-o';
import {FormControlTableLineDTO} from '../../../../dtos/sofia/form/form-control-table-line-d-t-o';
import {ComponentPersistEntityDTO} from '../../../../dtos/sofia/component/component-persist-entity-dto';
import {FormControlTableCellDTO} from '../../../../dtos/sofia/form/form-control-table-cell-d-t-o';
import * as uuid from 'uuid';
import {FormDto} from '../../../../dtos/sofia/form/form-dto';
import {FormControlTableControlDTO} from '../../../../dtos/sofia/form/form-control-table-control-d-t-o';

@Injectable({
  providedIn: 'root'
})
export class FormTableLinesService {

  constructor() {
  }

  // public setSelectedTableLine(componentPersistEntity: ComponentPersistEntityDTO,
  //                             componentPersistEntityDataLine: ComponentPersistEntityDataLineDTO) {
  //   componentPersistEntity.componentPersistEntityFieldList = componentPersistEntityDataLine.componentPersistEntityFieldList;
  //   componentPersistEntity.componentPersistEntityList = componentPersistEntityDataLine.componentPersistEntityList;
  //   // const ids = this.getChildPersistEntityIds(componentPersistEntity.componentPersistEntityList, []);
  //   // this.formAssignmentsService.assignComponentFieldsToTableFieldsByPersistEntityIds(this.form.dto, ids);
  // }

  public getChildPersistEntityIds(componentPersistEntityList: ComponentPersistEntityDTO[], ids: string[]): string[] {
    componentPersistEntityList.forEach(cpe => {
      ids.push(cpe.id);
      if (cpe.componentPersistEntityList != null) {
        ids = this.getChildPersistEntityIds(cpe.componentPersistEntityList, ids);
      }
    });
    return ids;
  }

  // *
  // * Generates FormTable component lines and cells be reading the component data lines.
  // *
  public generateFormTableLines(dto: FormDto): FormDto {
    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'table') {
            this.generateFormTableLinesAndCellsOnTable(formControl.formControlTable);
          }
        }
      }
    }
    return dto;
  }

  public generateFormTableLinesForCpe(dto: FormDto, id): FormDto {
    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'table') {
            if (formControl.formControlTable.componentPersistEntity.id === id) {
              this.generateFormTableLinesAndCellsOnTable(formControl.formControlTable);
            }
          }
        }
      }
    }
    return dto;
  }

  private generateFormTableLinesAndCellsOnTable(formControlTableDTO: FormControlTableDTO) {

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
        let position = 0;
        for (const componentPersistEntityField of componentPersistEntityDataLine.componentPersistEntityFieldList) {

          if (componentPersistEntityField.id === formControl.formControlField.fieldId) {
            const formControlTableCellDTO = new FormControlTableCellDTO();
            formControlTableCellDTO.id = uuid.v4();
            formControlTableCellDTO.componentPersistEntityField = componentPersistEntityField;
            formControlTableCellDTO.formControl = formControl;
            formControlTableLineDTO.formControlCells.push(formControlTableCellDTO);
            cellFound = true;
          }
          position++;
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

  private createTableCellOfFormControlFromComponentPEDataLine(formControl: FormControlTableControlDTO,
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

}
