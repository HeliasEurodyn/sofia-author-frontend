import {BaseDTO} from "../common/base-dto";

export class RuleDTO extends BaseDTO {

  code: string;

  name: string;

  description: string;

  ruleExpressionList: RuleExpressionDTO[] = [];

  constructor() {
    super();
  }

}

export class RuleExpressionDTO extends BaseDTO {

  field: string;

  operator: string;

  command: string;

  childrenColor: string = '';

  color: string = '';

  parrent: RuleExpressionDTO = null;

  ruleExpressionList: RuleExpressionDTO[] = [];

  expanded: Boolean = false;

  joinType: string = "and";

  childrenJoinType: string = "and";

  constructor() {
    super();
  }
}
