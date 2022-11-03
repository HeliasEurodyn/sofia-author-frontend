import {FormArea} from './form-area';
import {BaseDTO} from '../common/base-dto';

export class FormPopupDto extends BaseDTO {

  public code: string;

  public description: string;

  public editable: Boolean;

  public icon: string;

  public formAreas: FormArea[] = [];

}
