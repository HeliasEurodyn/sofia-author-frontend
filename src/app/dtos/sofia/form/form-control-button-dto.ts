import {BaseDTO} from '../../common/base-dto';

export class FormControlButtonDTO extends BaseDTO {
  code: string;
  icon: string;
  description: string;
  editor: string;
  visible: Boolean;
  cssClass: string;
}
