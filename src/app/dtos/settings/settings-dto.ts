import {BaseDTO} from '../common/base-dto';

export class SettingsDto extends BaseDTO {

  name = '';

  sidebarImage: any;

  loginImage: any;

  icon: any;

  oauth_prototype_user_id: string;
}
