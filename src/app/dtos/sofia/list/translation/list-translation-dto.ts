import {BaseDTO} from '../../../common/base-dto';
import {LanguageDTO} from '../../language/language-dto';

export class ListTranslationDTO extends BaseDTO {

  public language: LanguageDTO;

  public headerTitle: String = '';
  public headerDescription: String = '';

  public title: String = '';
  public description: String = '';

  public groupingTitle: String = '';
  public groupingDescription: String = '';

  constructor() {
    super();
  }
}
