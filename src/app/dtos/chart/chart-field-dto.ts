import {BaseDTO} from '../common/base-dto';

export class ChartFieldDTO extends BaseDTO {

  name: string;

  type: string;

  size: number;

  chartJson: string;

  description: string;

  public dataset: any[];

}



