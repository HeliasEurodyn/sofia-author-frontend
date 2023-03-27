import {BaseDTO} from '../common/base-dto';
import {XlsImportLineDTO} from './xls-import-line-dto';
import {ComponentDTO} from '../component/componentDTO';
import {AccessControlDto} from '../security/access-control-dto';
import { TagDTO } from '../tag/tag-dto';

export class XlsImportDTO extends BaseDTO {

  public code = '';

  public name = '';

  public description = '';

  public icon = '';

  public firstLine = 0;

  public xlsIterationColumn = '';

  public xlsImportLineList: XlsImportLineDTO[] = [];

  public component: ComponentDTO;

  public accessControlEnabled: Boolean;

  public accessControls: AccessControlDto[] = [];

  public tags: TagDTO[] = [];

  constructor() {
    super();
    this.xlsImportLineList = [];
  }
}
