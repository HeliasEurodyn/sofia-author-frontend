import {ChartFieldDTO} from './chart-field-dto';
import {BaseDTO} from '../../common/base-dto';
import {ListComponentFieldDTO} from '../list/list-component-field-d-t-o';

export class ChartDTO extends BaseDTO {

  title: string;

  icon: string;

  secondTitle: string;

  chartJson: string;

  optionsJson: string;

  query: string;

  horizontalAxe: string;

  public chartFieldList: ChartFieldDTO[];

  executePeriodically: boolean;

  refreshButton: boolean;

  executionInterval: number;

  public filterList: ListComponentFieldDTO[] = [];

  constructor() {
    super();
    this.chartFieldList = [];
    this.executionInterval = 0;
  }

}
