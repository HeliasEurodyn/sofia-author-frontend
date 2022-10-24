import {BaseDTO} from '../common/base-dto';
import {UserDto} from './user-dto';

export class UserGroupDto extends BaseDTO {

  name: string;

  users: UserDto[];

  constructor() {
    super();
    this.name = '';
    this.users = [];
  }

}
