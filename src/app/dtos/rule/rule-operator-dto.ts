import {BaseDTO} from "../common/base-dto";

export class RuleOperatorDTO  extends BaseDTO {

  name: string;

  code: string;

  description: string;

  constructor() {
    super();
  }

}
