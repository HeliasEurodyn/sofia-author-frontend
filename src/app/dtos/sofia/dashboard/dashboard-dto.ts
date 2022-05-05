import {BaseDTO} from '../../common/base-dto';
import {DashboardAreaDTO} from './dashboard-area-dto';
import {AccessControlDto} from '../security/access-control-dto';

export class DashboardDTO extends BaseDTO {

  public description: string;

  public dashboardAreaList: DashboardAreaDTO[];

  public accessControlEnabled: Boolean;

  public accessControls: AccessControlDto[] = [];

  constructor() {
    super();
    this.dashboardAreaList = [];
    this.accessControls = [];
  }
}
