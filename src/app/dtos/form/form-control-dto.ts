import {FormControlFieldDTO} from './form-control-field-d-t-o';
import {BaseDTO} from '../common/base-dto';
import {FormControlTableDTO} from './form-control-table-d-t-o';
import {FormControlButtonDTO} from './form-control-button-dto';

export class FormControlDto extends BaseDTO {

  public type: string;
  public cssclass: string;
  public formControlField: FormControlFieldDTO;
  public formControlTable: FormControlTableDTO;
  public formControlButton: FormControlButtonDTO;

  public refreshUuid: string;

  constructor() {
    super();
    this.formControlField = new FormControlFieldDTO();
    this.formControlTable = new FormControlTableDTO();
  }

}
