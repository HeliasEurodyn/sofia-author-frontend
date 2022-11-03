import {PersistEntityFieldDTO} from '../persistEntity/persist-entity-field-dto';
import {BaseDTO} from '../common/base-dto';
import {ComponentPersistEntityFieldAssignmentDTO} from './component-persist-entity-field-assignment-dto';
import {ComponentPersistEntityDTO} from './component-persist-entity-dto';

export class ComponentPersistEntityFieldDTO extends BaseDTO {

  code: string;

  description: string;

  defaultValue: string;

  editor: string;

  public value: string;

  saveStatement: string;

  locateStatement: string;

  joinPersistEntityCode: string;

  joinPersistEntity: ComponentPersistEntityDTO;

  persistEntityField: PersistEntityFieldDTO;

  assignment: ComponentPersistEntityFieldAssignmentDTO;

  constructor() {
    super();
    this.persistEntityField = new PersistEntityFieldDTO();
    this.assignment = new ComponentPersistEntityFieldAssignmentDTO();
  }

}
