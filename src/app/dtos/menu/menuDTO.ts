import {BaseDTO} from '../common/base-dto';
import {AccessControlDto} from '../security/access-control-dto';
import {MenuTranslationDTO} from './menu-translation-dto';

export class MenuDTO extends BaseDTO {

  name: string;

  menuFieldList: MenuFieldDTO[] = [];

  public accessControlEnabled: Boolean;

  public accessControls: AccessControlDto[] = [];

  public translations: MenuTranslationDTO[] = [];

  constructor() {
    super();
  }
}

export class MenuFieldDTO extends BaseDTO {

  name: string;

  icon: string;

  command: string;

  menuFieldList: MenuFieldDTO[] = [];

  expanded: Boolean = false;

  public translations: MenuTranslationDTO[] = [];

  constructor() {
    super();
  }
}
