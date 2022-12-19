import {BaseDTO} from '../common/base-dto';
import {FormControlDto} from './form-control-dto';
import {FormTabTranslationDTO} from "./translation/form-tab-translation-dto";
import {FormAreaTranslationDTO} from "./translation/form-area-translation-dto";

export class FormArea extends BaseDTO {

  public code: string;

  public title: string;

  public description: string;

  public icon: string;

  public cssclass: string;

  public formControls: FormControlDto[] = [];

  public translations: FormAreaTranslationDTO[] = [];
}
