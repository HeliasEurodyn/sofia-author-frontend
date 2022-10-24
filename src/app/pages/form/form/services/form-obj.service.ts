import {Injectable} from '@angular/core';
import {FormDto} from '../../../../dtos/sofia/form/form-dto';
import {FormArea} from '../../../../dtos/sofia/form/form-area';
import {FormControlDto} from '../../../../dtos/sofia/form/form-control-dto';

@Injectable({
  providedIn: 'root'
})
export class FormObjService {

  constructor() {
  }

  public getFormAreaByCode(code, dto: FormDto): FormArea {
    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        if (formArea.code === code) {
          return formArea;
        }
      }
    }
    return null;
  }

  public getFormFieldsByCode(code, dto: FormDto): FormControlDto[] {
    const formControls: FormControlDto[] = [];

    const formSections = dto.formTabs.concat(dto.formPopups);
    for (const formTab of formSections) {
      for (const formArea of formTab.formAreas) {
        for (const formControl of formArea.formControls) {
          if (formControl.type === 'field' && formControl.formControlField != null) {
            if (formControl.formControlField.componentPersistEntity != null &&
              formControl.formControlField.componentPersistEntityField != null) {
              const curFieldCode = formControl.formControlField.componentPersistEntity.code + '.'
                + formControl.formControlField.componentPersistEntityField.code;
              if (code === curFieldCode) {
                formControls.push(formControl);
              }
            }
          }
        }
      }
    }
    return formControls;
  }


}
