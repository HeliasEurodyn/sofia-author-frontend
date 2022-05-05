import {BaseDTO} from '../../common/base-dto';
import {ComponentPersistEntityDTO} from './component-persist-entity-dto';
import {AccessControlDto} from '../security/access-control-dto';

export class ComponentDTO extends BaseDTO {
  public name: string;
  public description: string;
  public componentPersistEntityList: ComponentPersistEntityDTO[] = [];
  public accessControls: AccessControlDto[] = [];
  public accessControlEnabled: Boolean;
}
