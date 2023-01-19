import {UserDto} from '../user/user-dto';

export class PrivilegeDTO {

  roleId: String;
  userIds: String[] = [];


  constructor(roleId: String, userIds: String[]) {
    this.roleId = roleId;
    this.userIds = userIds;
  }
}
