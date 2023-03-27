import {BaseDTO} from '../common/base-dto';
import {LanguageDTO} from '../language/language-dto';
import { TagDTO } from '../tag/tag-dto';

export class MenuTranslationDTO extends BaseDTO {
  public language: LanguageDTO;

  public name: String;

  constructor() {
    super();
  }
}
