import {BaseDTO} from '../common/base-dto';
import {ReportParameterDTO} from './report-parameter-dto';
import {AccessControlDto} from '../security/access-control-dto';
import { TagDTO } from '../tag/tag-dto';

export class ReportDTO extends BaseDTO {
  code: string;
  name: string;
  type: string;
  reportFilename: string;
  accessControlEnabled: Boolean;
  reportParameterList: ReportParameterDTO[];
  reportType: string;
  subreports: ReportDTO[];
  accessControls: AccessControlDto[] = [];
  public tags: TagDTO[] = [];

  constructor() {
    super();
    this.reportParameterList = [];
    this.subreports = [];
    this.subreports = [];
    this.reportType = 'pdf'
  }

}
