import {PersistEntityDTO} from '../persistEntity/persist-entity-dto';
import {ComponentPersistEntityFieldDTO} from './component-persist-entity-field-dto';
import {BaseDTO} from '../common/base-dto';
import {ComponentPersistEntityDataLineDTO} from './component-persist-entity-data-line-dto';

export class ComponentPersistEntityDTO extends BaseDTO {

  code: string;

  selector: string;

  allowRetrieve: boolean;

  allowSave: boolean;

  deleteType: string;

  public persistEntity: PersistEntityDTO;

  public componentPersistEntityFieldList: ComponentPersistEntityFieldDTO[] = [];

  public defaultComponentPersistEntityFieldList: ComponentPersistEntityFieldDTO[] = [];

  public componentPersistEntityDataLines: ComponentPersistEntityDataLineDTO[] = [];

  public componentPersistEntityList: ComponentPersistEntityDTO[] = [];

  public defaultComponentPersistEntityList: ComponentPersistEntityDTO[] = [];

  public multiDataLine: boolean;

  showFieldList: boolean;

  constructor() {
    super();
    this.componentPersistEntityDataLines = [];
    this.componentPersistEntityFieldList = [];
    this.defaultComponentPersistEntityFieldList = [];
  }
}
