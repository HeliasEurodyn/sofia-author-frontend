import {BaseDTO} from '../../common/base-dto';
import {UserDto} from '../user/user-dto';
import {UserGroupDto} from '../user/user-group-dto';
import {RoleDTO} from '../user/role-dto';

export class AccessControlDto extends BaseDTO {

  type: string;

  entityId: number;

  createEntity: boolean;

  updateEntity: boolean;

  readEntity: boolean;

  deleteEntity: boolean;

  role: RoleDTO;
}
