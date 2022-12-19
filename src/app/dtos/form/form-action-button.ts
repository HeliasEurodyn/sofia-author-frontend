import {BaseDTO} from '../common/base-dto';
import {ListActionButtonTranslationDTO} from "../list/translation/list-action-button-translation-dto";
import {FormActionButtonTranslationDTO} from "./translation/form-action-button-translation-dto";

export class FormActionButton extends BaseDTO {
  public code: string;
  icon: string;
  description: string;
  editor: string;
  visible: Boolean;
  editable: Boolean;
  cssClass: string;
  public formActionButtons: FormActionButton[] = [];
  public translations: FormActionButtonTranslationDTO[] = [];
}
