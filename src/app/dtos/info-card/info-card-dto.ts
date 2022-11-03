import {BaseDTO} from '../common/base-dto';
import {InfoCardScriptDTO} from './info-card-script-dto';

export class InfoCardDTO extends BaseDTO {

  title: string;

  description: string;

  cardText: string;

  query: string;

  command: string;

  commandIcon: string;

  executePeriodically: boolean;

  executionInterval: number;

  scripts: InfoCardScriptDTO[] = [];

  icon: string;

  iconColor: string;

}
