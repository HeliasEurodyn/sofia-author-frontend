import {BaseDTO} from '../common/base-dto';

export class ReportParameterDTO extends BaseDTO {

  code: string;
  reportCode: string;
  value: string;

  constructor() {
    super();
    this.code = '';
    this.reportCode = '';
    this.value = '';
  }

}
