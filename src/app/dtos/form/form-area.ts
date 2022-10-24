import {BaseDTO} from '../common/base-dto';
import {FormControlDto} from './form-control-dto';

export class FormArea extends BaseDTO {

  public code: string;

  public title: string;

  public description: string;

  public icon: string;

  public cssclass: string;

  public formControls: FormControlDto[] = [];
}
