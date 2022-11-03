import {DashboardItemDTO} from './dashboard-item-dto';
import {BaseDTO} from '../common/base-dto';

export class DashboardAreaDTO extends BaseDTO {

  public cssclass: string;

  public cssStyle: string;

  public dashboardItemList: DashboardItemDTO[];

  constructor() {
    super();
    this.dashboardItemList = [];
  }

}
