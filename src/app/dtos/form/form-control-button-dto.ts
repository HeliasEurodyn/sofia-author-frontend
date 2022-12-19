import {BaseDTO} from '../common/base-dto';
import {FormControlButtonTranslationDTO} from "./translation/form-control-button-translation-dto";

export class FormControlButtonDTO extends BaseDTO {
  code: string;
  icon: string;
  description: string;
  editor: string;
  visible: Boolean;
  cssClass: string;
  public translations: FormControlButtonTranslationDTO[] = [];
}
