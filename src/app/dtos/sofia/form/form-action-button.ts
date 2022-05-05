import {BaseDTO} from '../../common/base-dto';

export class FormActionButton extends BaseDTO {
  public code: string;
  icon: string;
  description: string;
  editor: string;
  visible: Boolean;
  editable: Boolean;
  cssClass: string;
  public formActionButtons: FormActionButton[] = [];
}
