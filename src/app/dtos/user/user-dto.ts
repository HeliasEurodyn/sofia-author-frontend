import {MenuDTO} from '../menu/menuDTO';
import {BaseDTO} from '../common/base-dto';
import {RoleDTO} from './role-dto';
import {LanguageDTO} from '../language/language-dto';

export class UserDto extends BaseDTO {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  status: string;
  dateFormat: string;
  sidebarMenu: MenuDTO = new MenuDTO();
  headerMenu: MenuDTO = new MenuDTO();
  loginNavCommand: string;
  searchNavCommand: string;
  provider: string;
  roles: RoleDTO[] = [];
  defaultLanguage: LanguageDTO;
  currentLanguage: LanguageDTO;
  languages: LanguageDTO[] = [];
  isChecked: boolean ;
}
