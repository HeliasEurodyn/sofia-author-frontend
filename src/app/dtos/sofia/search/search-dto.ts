import {BaseDTO} from '../../common/base-dto';
import {AccessControlDto} from '../security/access-control-dto';

export class SearchDTO extends BaseDTO {

  name: string;

  query: string;

  accessControlEnabled: Boolean;

  accessControls: AccessControlDto[] = [];
}
