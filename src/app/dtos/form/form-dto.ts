import {ComponentDTO} from '../component/componentDTO';
import {BaseDTO} from '../common/base-dto';
import {FormTabDto} from './form-tab-dto';
import {FormScript} from './form-script';
import {FormPopupDto} from './form-popup-dto';
import {FormActionButton} from './form-action-button';
import {FormCss} from './form-css';
import {AccessControlDto} from '../security/access-control-dto';
import {FormTranslationDto} from "./translation/form-translation-dto";
import {TagDTO} from "../tag/tag-dto";

export class FormDto extends BaseDTO {
  public name: string;
  public title: string;
  public description: string = '<b>Create</b> a new Entity or <i class="fa fa-pencil-alt"></i> <b>Edit</b> the existing one.';
  public icon: string;
  public jsonUrl: string;
  public accessControlEnabled: Boolean;
  public tag: string;
  public tags: TagDTO[] = [];
  public component: ComponentDTO;
  public formTabs: FormTabDto[] = [];
  public formPopups: FormPopupDto[] = [];
  public formScripts: FormScript[] = [];
  public formCssList: FormCss[] = [];
  public instanceVersion: number;
  public formActionButtons: FormActionButton[] = [];
  public accessControls: AccessControlDto[] = [];
  public translations: FormTranslationDto[] = [];
}
