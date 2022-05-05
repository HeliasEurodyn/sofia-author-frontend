import {BaseDTO} from '../../common/base-dto';
import {LanguageDTO} from '../language/language-dto';

export class MenuTranslationDTO extends BaseDTO {
  public language: LanguageDTO;

  public name: String;

  constructor() {
    super();
  }
}
