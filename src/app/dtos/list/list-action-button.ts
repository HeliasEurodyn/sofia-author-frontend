import {BaseDTO} from '../common/base-dto';
import {ListActionButtonTranslationDTO} from './translation/list-action-button-translation-dto';

export class ListActionButton extends BaseDTO {
  public code: string;
  icon: string;
  description: string;
  editor: string;
  visible: Boolean;
  cssClass: string;
  public listActionButtons: ListActionButton[] = [];
  public translations: ListActionButtonTranslationDTO[] = [];
}
