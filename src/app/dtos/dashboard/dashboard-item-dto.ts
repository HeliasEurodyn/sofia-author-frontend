import {BaseDTO} from '../common/base-dto';

export class DashboardItemDTO extends BaseDTO {

  public type: string;

  public entityId: string;

  public cssclass: string;

  public command: string;

}
