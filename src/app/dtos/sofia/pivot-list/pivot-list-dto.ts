import {PivotListComponentFieldDTO} from './pivot-list-component-field-dto';
import {BaseDTO} from '../../common/base-dto';
import {ComponentDTO} from '../component/componentDTO';
import {ListActionButton} from '../list/list-action-button';
import {AccessControlDto} from '../security/access-control-dto';
import {ListTranslationDTO} from '../list/translation/list-translation-dto';
import {ListComponentFieldDTO} from '../list/list-component-field-d-t-o';

export class PivotListDTO extends BaseDTO {
  public code = '';
  public name = '';
  public headerTitle = '';
  public headerDescription = '';
  public headerIcon = '';
  public groupingTitle = '';
  public groupingDescription = '';
  public title = '';
  public description = '';
  public icon = '';
  public selector = '';
  public filterFieldStructure: String = '';
  public customFilterFieldStructure: Boolean = false;
  public exportExcel: Boolean;
  public defaultPage: String = 'list';
  public autoRun: Boolean = false;
  public listVisible: Boolean = true;
  public filterVisible: Boolean = false;
  public totalPages: number;
  public pageSize: number;
  public hasMaxSize: Boolean;
  public maxSize: number;
  public headerFilters: Boolean;
  public accessControlEnabled: Boolean;
  public component: ComponentDTO;
  public listActionButtons: ListActionButton[] = [];
  public listComponentColumnFieldList: PivotListComponentFieldDTO[] = [];
  public listComponentFilterFieldList: PivotListComponentFieldDTO[] = [];
  public listComponentLeftGroupFieldList: PivotListComponentFieldDTO[] = [];
  public listComponentTopGroupFieldList: PivotListComponentFieldDTO[] = [];
  public listComponentOrderByFieldList: PivotListComponentFieldDTO[] = [];
  public listComponentActionFieldList: ListComponentFieldDTO[] = [];
  public instanceVersion: number;
  public accessControls: AccessControlDto[] = [];

  public translations: ListTranslationDTO[] = [];
}
