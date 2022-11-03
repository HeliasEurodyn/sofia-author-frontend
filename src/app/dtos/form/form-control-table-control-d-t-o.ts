import {BaseDTO} from '../common/base-dto';
import {FormControlFieldDTO} from './form-control-field-d-t-o';
import {FormControlButtonDTO} from './form-control-button-dto';

export class FormControlTableControlDTO extends BaseDTO {

  public type: string;
  public cssclass: string;
  public formControlField: FormControlFieldDTO;
  public formControlButton: FormControlButtonDTO;

  constructor() {
    super();
    this.formControlField = new FormControlFieldDTO();
  }

}
