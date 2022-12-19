import {BaseDTO} from "../../common/base-dto";
import {LanguageDTO} from "../../language/language-dto";

export class FormTranslationDto extends BaseDTO {

  public language: LanguageDTO;

  public name: string = '';
  public title: string = '';
  public description: string = '';

  constructor() {
    super();
  }
}
