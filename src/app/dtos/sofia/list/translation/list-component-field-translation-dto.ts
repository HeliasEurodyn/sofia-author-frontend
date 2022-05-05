import {LanguageDTO} from '../../language/language-dto';
import {BaseDTO} from '../../../common/base-dto';

export class ListComponentFieldTranslationDTO extends BaseDTO {

  public language: LanguageDTO;

  public description: String = '';

}
