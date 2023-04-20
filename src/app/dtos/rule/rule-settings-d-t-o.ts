import {BaseDTO} from "../common/base-dto";

export class RuleSettingsDTO extends BaseDTO {

  name: string;

  title: string;

  description: string;

  ruleSectionTitle: string;

  ruleSectionDescription: string;

  fieldCommand: string;

  operatorCommand: string;

  constructor() {
    super();
  }

}


