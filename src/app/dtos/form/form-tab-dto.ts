import {BaseDTO} from '../common/base-dto';
import {FormArea} from './form-area';
import {FormControlFieldTranslationDTO} from "./translation/form-control-field-translation-dto";
import {FormTabTranslationDTO} from "./translation/form-tab-translation-dto";

export class FormTabDto extends BaseDTO {

  public code: string;

  public description: string;

  public icon: string;

  public editable: Boolean;

  public formAreas: FormArea[] = [];

  public translations: FormTabTranslationDTO[] = [];
}
