import {ComponentDTO} from '../component/componentDTO';
import {BaseDTO} from '../common/base-dto';
import {FormTabDto} from './form-tab-dto';
import {FormScript} from './form-script';
import {FormPopupDto} from './form-popup-dto';
import {FormActionButton} from './form-action-button';
import {FormCss} from './form-css';
import {AccessControlDto} from '../security/access-control-dto';

export class FormDto extends BaseDTO {

  public name: string;
  public title: string;
  public description: string;
  public icon: string;
  public jsonUrl: string;
  public accessControlEnabled: Boolean;
  public businessUnit: string;
  public component: ComponentDTO;
  public formTabs: FormTabDto[] = [];
  public formPopups: FormPopupDto[] = [];
  public formScripts: FormScript[] = [];
  public formCssList: FormCss[] = [];
  public instanceVersion: number;
  public formActionButtons: FormActionButton[] = [];
  public accessControls: AccessControlDto[] = [];

}
