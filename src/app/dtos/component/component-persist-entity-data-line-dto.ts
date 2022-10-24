import {BaseDTO} from '../common/base-dto';
import {ComponentPersistEntityFieldDTO} from './component-persist-entity-field-dto';
import {ComponentPersistEntityDTO} from './component-persist-entity-dto';

export class ComponentPersistEntityDataLineDTO extends BaseDTO {

  public componentPersistEntityId = '';

  public componentPersistEntityFieldList: ComponentPersistEntityFieldDTO[] = [];

  public componentPersistEntityList: ComponentPersistEntityDTO[] = [];

}
