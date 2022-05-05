import {BaseDTO} from '../../common/base-dto';
import {FormArea} from './form-area';

export class FormTabDto extends BaseDTO {

  public code: string;
  
  public description: string;

  public icon: string;

  public editable: Boolean;

  public formAreas: FormArea[] = [];
}
