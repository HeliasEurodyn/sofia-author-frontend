import {BaseDTO} from '../../common/base-dto';

export class InfoCardDTO extends BaseDTO {

  title: string;

  icon: string;

  iconColor: string;

  description: string;

  cardText: string;

  query: string;

  command: string;

  commandIcon: string;

  executePeriodically: boolean;

  executionInterval: number;

}
