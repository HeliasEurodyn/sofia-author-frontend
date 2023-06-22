import {BaseDTO} from "../common/base-dto";
import {TagDTO} from "../tag/tag-dto";
import {RuleSettingsQueryDTO} from "./rule-settings-query-dto";

export class RuleSettingsDTO extends BaseDTO {

  name: string;

  title: string;

  description: string;

  ruleSectionTitle: string;

  ruleSectionDescription: string;

  fieldCommand: string;

  operatorCommand: string;

  queryList: RuleSettingsQueryDTO[] = [];

  constructor() {
    super();
  }

}


