import {BaseDTO} from '../common/base-dto';
import {AccessControlDto} from '../security/access-control-dto';

export class SettingsDto extends BaseDTO {

  name = '';

  sidebarImage: any;

  loginImage: any;

  icon: any;
}
