import {BaseDTO} from '../common/base-dto';
import {RoleDTO} from '../user/role-dto';

export class AccessControlDto extends BaseDTO {

  type: string;

  entityId: string;

  createEntity: boolean;

  updateEntity: boolean;

  readEntity: boolean;

  deleteEntity: boolean;

  role: RoleDTO;
}
