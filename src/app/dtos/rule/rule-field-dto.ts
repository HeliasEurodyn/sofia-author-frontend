import {BaseDTO} from "../common/base-dto";
import {RuleSettingsQueryDTO} from "./rule-settings-query-dto";
import {RuleCodeDTO} from "./rule-code-dto";

export class RuleFieldDTO extends BaseDTO {

  name: string;

  code: string;

  description: string;

  codeList: RuleCodeDTO[] = [];

  constructor() {
    super();
  }

}


